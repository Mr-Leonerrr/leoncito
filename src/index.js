require('dotenv').config();
const tmi = require('tmi.js');
const config = require('./utils/config.json');

// Define configuration options
const opts = {
	options: {
		debug: true,
	},
	identity: {
		username: 'leoncitobot',
		password: `oauth:${process.env.CLIENT_TOKEN}`,
	},
	channels: config.channels,
	reconnectInterval: 5000,
};

// Create a client with our options
const client = new tmi.client(opts);

module.exports = client;

require('./functions/handler')().then(() => {
	client.connect().catch((err) => console.log(err));
});