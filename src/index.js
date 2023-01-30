require('dotenv').config();

const Leoncito = require('./structures/Leoncito');
const mongoose = require('mongoose');
module.exports = client = new Leoncito();

const init = async () => {
	await require('./functions/handler')();
	client.connect().catch((err) => console.log('Init error', err));

	await mongoose.set('strictQuery', true);
	await mongoose.default.connect(process.env.MONGODB_URI, {
		dbName: 'leoncito',
	}, () => console.log('MongoDB connected!'));
};

init().then(() => console.log('Bot is ready!'));