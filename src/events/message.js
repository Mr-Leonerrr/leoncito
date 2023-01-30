const client = require('../index');

client.on('message', onMessageHandler);

async function onMessageHandler(channel, user, content, _self) {
	if (_self || !content.trimStart().startsWith(client.config.prefix)) return;

	// Remove whitespace from chat message
	const args = content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

	if (!command || !command.config.enabled) return;

	if (command.config.args && !args.length) {
		return console.log('No args provided');
	}

	try {
		await command.run(channel, user, content);
	} catch (error) {
		console.error('Error in command execution', error);
	}
}