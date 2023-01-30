const client = require('../index.js');

client.on('connected', onConnectedHandler);

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
}