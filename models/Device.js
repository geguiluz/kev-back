const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    index: { unique: true },
  },
  name: {
    type: String,
  },
  macAddress: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model('device', DeviceSchema);
