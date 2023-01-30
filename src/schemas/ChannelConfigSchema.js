const mongoose = require('mongoose'),
  locales = require('../locales/locales-meta.json');

const ConfigSchema = new mongoose.Schema({
  channelName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  locale: {
    type: mongoose.Schema.Types.String,
    default: locales.find((local) => local.default).name,
  },
});

module.exports = mongoose.model('Channel Config', ConfigSchema);