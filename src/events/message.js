const client = require('../index');

client.on('message', onMessageHandler);

async function onMessageHandler(channel, user, content, _self) {
  if (_self || !content.trimStart().startsWith(client.config.prefix)) return;

  const args = content.slice(client.config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

  if (!command || command.config.disabled) return;

  if (command.config.args && !args.length) {
    return console.log('No args provided');
  }

  try {
    await command.run(channel, { args, content }, user);
  } catch(error) {
    console.error('Error in command execution', error);
  }
}