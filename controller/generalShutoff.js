const powerDevice = require('../controller/powerDevice');
const getUserDevices = require('../controller/getUserDevices');

module.exports = generalShutoff = async (user, response) => {
  // TODO:
  // 1 - Get all device ID's from the database
  // 2 - Call powerDevice with command OFF for all devices
  // powerDevice(serialNumber, 'OFF', res);
  const devices = await getUserDevices(user);
  const res = {};
  devices.forEach(currentDevice => {
    const { serialNumber } = currentDevice;
    console.log('Turning off ', serialNumber);
    powerDevice(serialNumber, 'OFF');
  });

  return response.json({ msg: 'All devices Turned off', devices });
};
