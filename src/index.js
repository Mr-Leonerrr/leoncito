require('dotenv').config();

const Leoncito = require('./structures/Leoncito');
const mongoose = require('mongoose'),
  client = new Leoncito();

const init = async () => {
  await require('./functions/handler')();
  client.connect().catch((err) => console.log('Init error', err));

  await mongoose.set('strictQuery', true);
  await mongoose.default.connect(process.env.MONGODB_URI, {
    dbName: 'leoncito',
  }, () => console.log('MongoDB connected!'));

  const locales = require('./utils/locales');
  client.translations = await locales();
};

module.exports = client;

init().then(() => console.log('Bot is ready!'));