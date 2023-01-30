const client = require('../index.js');

client.on('message', onMessageHandler);

function onMessageHandler(channel, user, message, _self) {
	if (_self || !message.startsWith(';')) return;

	// Remove whitespace from chat message
	const commandName = message.toLowerCase().trim();

	// If the command is known, let's execute it
	if (commandName === ';dice') {
		const num = rollDice();
		client.say(channel, `You rolled a ${num}`).then(() => {
			console.log(`* Executed ${commandName} command`);
		}).catch((err) => console.log(err));
	} else {
		console.log(`* Unknown command ${commandName}`);
	}
}

// Function called when the "dice" command is issued
function rollDice() {
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}