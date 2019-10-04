// Gets all user devices for telematics purposes

const Device = require('../models/Device');

module.exports = getUserDevices = async user => {
  try {
    const devices = await Device.find({ user: user });
    return devices;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
