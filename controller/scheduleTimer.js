const randomToggle = require('../controller/randomToggle');

module.exports = scheduleTimer = (isEnabled, delay) => {
  try {
    if (!isEnabled) return false;
    setInterval(() => {
      console.log('Home alone routine');
      // TODO: Query the presets collection and find all devices on active
      // presets of the type "home-alone". Then we'll random toggle all devices
      // returned
      let user = {
        _id: '5d95835ed44b2b8bc00fb47a',
        name: 'Memo Eguiluz',
      };
      randomToggle(user);
    }, delay * 1000);
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
