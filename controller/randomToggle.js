const powerDevice = require('./powerDevice');
const getUserDevices = require('./getUserDevices');

module.exports = randomToggle = async user => {
  // TODO:
  // 1 - Get all device ID's and commands from the database
  // 2 - Generate a random interval in order to toggle actions
  // 3 - Call powerDevice for each serial number
  // powerDevice(serialNumber, command, res);
  const devices = await getUserDevices(user);
  const res = {};
  console.log('Toggling random devices');
  let devicesOff = devices.map(async currentDevice => {
    // Let's flip a coin to see if we toggle this one or not
    let coin = Math.floor(Math.random() * 2);
    let deviceRes = '';
    console.log('Coin: ', coin);
    if (coin === 1) {
      const { serialNumber } = currentDevice;
      console.log('Toggling ', serialNumber);
      deviceRes = await powerDevice(serialNumber, '2');
    }
    return deviceRes;
  });

  return { msg: 'Random devices Turned off', devicesOff };
};
