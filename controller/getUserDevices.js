// Gets all user devices for telematics purposes

const Device = require('../models/Device');

module.exports = getUserDevices = async user => {
  const devices = await Device.find({ user: user });
  return devices;
};
