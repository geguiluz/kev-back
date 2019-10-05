const powerDevice = require('./powerDevice');

module.exports = randomToggle = async devices => {
  try {
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
        const { _id, serialNumber } = currentDevice;
        console.log('Toggling ', serialNumber);
        deviceRes = await powerDevice(_id, serialNumber, '2');
      }
      return deviceRes;
    });
    return { msg: 'Random devices toggled', devicesOff };
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
