const randomToggle = require('../controller/randomToggle');

module.exports = scheduleTimer = (isEnabled, delay) => {
  if (!isEnabled) return false;
  setInterval(() => {
    console.log('Cant stop me now!');
    let user = {
      _id: '5d899972ec271a15244517c6',
      name: 'Memo Eguiluz',
    };
    randomToggle(user);
  }, delay * 1000);
};
