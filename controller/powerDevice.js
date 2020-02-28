require('dotenv').config();

const mqttPost = require('./mqtt/mqttPost');

module.exports = powerDevice = async (_id, serialNumber, command) => {
  console.log(
    `${command === '2' ? `Toggling` : `Powering ${command}`} device`,
    serialNumber
  );
  const result = await mqttPost(`cmnd/${serialNumber}_fb/power`, command);
  return result;
};
