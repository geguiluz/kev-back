const powerDevice = require('./powerDevice');
const getUserDevices = require('./getUserDevices');

module.exports = randomToggle = async user => {
  try {
    // TODO: Get the devices as an array argument
    if (user !== null) {
      const devices = await getUserDevices(user);
      console.log('Toggling random devices');
      // 1 - Map through devices passed in from the devices array
      let devicesOff = devices.map(async currentDevice => {
        // 2 - Generate a random interval in order to toggle actions
        // Let's flip a coin to see if we toggle this one or not
        let coin = Math.floor(Math.random() * 2);
        let deviceRes = '';
        console.log('Coin: ', coin);
        if (coin === 1) {
          // 3 - Call powerDevice for each serial number
          const { serialNumber } = currentDevice;
          console.log('Toggling ', serialNumber);
          deviceRes = await powerDevice(serialNumber, '2');
        }
        return deviceRes;
      });
      return { msg: 'Random devices Turned off', devicesOff };
    }
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
