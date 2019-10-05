const powerDevice = require('../controller/powerDevice');
const getUserDevices = require('../controller/getUserDevices');

module.exports = generalShutoff = async user => {
  // TODO:
  // 1 - Get all device ID's from the database
  // 2 - Call powerDevice with command OFF for all devices
  // powerDevice(serialNumber, 'OFF', res);
  try {
    const devices = await getUserDevices(user);
    const res = {};
    let devicesOff = devices.map(async currentDevice => {
      const { _id, serialNumber } = currentDevice;
      console.log('Turning off ', serialNumber);
      // let deviceRes = await powerDevice(serialNumber, 'OFF');
      await powerDevice(_id, serialNumber, 'OFF', response => {
        try {
          return res.json(response);
        } catch (err) {
          console.error(err.message);
          return err;
        }
      });
      // return deviceRes;
    });

    return { msg: 'All devices Turned off', devicesOff };
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
