/**
 * @class Command
 * @property {Leoncito} client
 * @property {Object} help
 * @property {String} help.name
 * @property {String} help.description
 * @property {String[]} help.aliases
 * @property {Object} config
 * @property {Boolean} config.disabled
 * @property {Boolean} config.dmResolvable
 * @property {Boolean} config.args
 * @property {Boolean} config.ownerOnly
 * @property {Boolean} config.moderatorOnly
 */
class Command {
  constructor(client, { name, description, aliases, disabled, dmResolvable, args, ownerOnly, moderatorOnly }) {
    this.client = client;
    this.config = {
      disabled: disabled || false,
      dmResolvable: dmResolvable || false,
      args: args || false,
      ownerOnly: ownerOnly || false,
      moderatorOnly: moderatorOnly || false,
    };
    this.help = {
      name: name,
      description: description,
      aliases: aliases || [],
    };
  }
}

module.exports = Command;