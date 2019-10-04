const randomToggle = require('../controller/randomToggle');
const getUserDevices = require('./getUserDevices');

module.exports = scheduleTimer = async (isEnabled, delay) => {
  try {
    if (!isEnabled) return false;
    let user = {
      _id: '5d95835ed44b2b8bc00fb47a',
      name: 'Memo Eguiluz',
    };
    const devices = await getUserDevices(user);
    const res = {};
    let devicesOff = devices.map(async currentDevice => {
      const { serialNumber } = currentDevice;
      console.log('Turning off ', serialNumber);
      // let deviceRes = await powerDevice(serialNumber, 'OFF');
      await powerDevice(serialNumber, 'ON', response => {
        try {
          return res.json(response);
        } catch (err) {
          console.error(err.message);
          return err;
        }
      });
      // return deviceRes;
    });
    setInterval(() => {
      console.log('Home alone routine');
      // TODO: Query the presets collection and find all devices on active
      // presets of the type "home-alone". Then we'll random toggle all devices
      // returned
      randomToggle(devices);
    }, delay * 1000);
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
