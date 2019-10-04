const randomToggle = require('../controller/randomToggle');

module.exports = scheduleTimer = (isEnabled, delay) => {
  try {
    if (!isEnabled) return false;
    setInterval(() => {
      console.log('Cant stop me now!');
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
