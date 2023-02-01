const { client } = require('tmi.js');
const config = require('../utils/config.json');
const path = require('path');

/**
 * @class Leoncito
 */
class Leoncito extends client {
  constructor() {
    super({
      options: {
        debug: true,
      },
      identity: {
        username: 'leoncitobot',
        password: `oauth:${process.env.CLIENT_TOKEN}`,
      },
      channels: config.channels,
      connection: {
        reconnectInterval: 5000,
      },
    });

    this.config = config;
    this.commands = new Map();
    this.aliases = new Map();
    this.locales = require('../locales/locales-meta.json');
  }

  get defaultLocale() {
    return this.locales.find((locale) => locale.default).name;
  }

  translate(key, args, locale) {
    if (!locale) locale = this.defaultLocale;
    const localeData = this.locales.get(locale);
    if (!localeData) throw 'Invalid locale set in data.';
    return locale(key, args);
  }

  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
      props.config.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.help.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch(e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }
}

module.exports = Leoncito;