const mongoose = require('mongoose');

const PresetSchema = mongoose.Schema({
  presetName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  actions: {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'device',
    },
    command: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('preset', PresetSchema);
