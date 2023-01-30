require('dotenv').config();

const Leoncito = require('./structures/Leoncito');
module.exports = client = new Leoncito();

const init = async () => {
	await require('./functions/handler')();
	client.connect().catch((err) => console.log('Init error', err));
};

init().then(() => console.log('Bot is ready!'));