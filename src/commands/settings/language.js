const Command = require('../../structures/Command');
const ChannelConfig = require('../../schemas/ChannelConfigSchema');

class Language extends Command {
  constructor (client) {
    super(client, {
      name: 'language',
      description: 'Change the language of the bot',
      aliases: ['lang'],
      moderatorOnly: true,
    });
  }

  async run (channel, { args }) {
    const channelName = channel.slice(1);
    const availableLocale = this.client.locales;
    const lang = availableLocale.find((l) => l.name === args[0] || l.aliases.includes(args[0]));

    if (!lang) {
      return await this.client.say(channel, `/me Invalid language. Available languages: ${availableLocale.map((l) => l.name).join(', ')}`);
    }

    const channelData = await ChannelConfig.findOne({ channelName });

    if (!channelData) {
      const newChannel = new ChannelConfig({
        channelName,
        locale: lang.name,
      });
      await newChannel.save();
    } else {
      channelData.locale = lang.name;
      await channelData.save();
    }

    await this.client.say(channel, `/me Language changed to ${channelData.locale}`);
  }
}

module.exports = Language;