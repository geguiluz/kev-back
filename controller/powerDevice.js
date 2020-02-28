require('dotenv').config();

const mqttPost = require('./mqtt/mqttPost');
const mqttSubscribe = require('./mqtt/mqttSubscribe');

module.exports = powerDevice = async (_id, serialNumber, command) => {
  console.log(
    `${command === '2' ? `Toggling` : `Powering ${command}`} device`,
    serialNumber
  );
  await mqttPost(`cmnd/${serialNumber}_fb/power`, command);
  const result = await mqttSubscribe(`stat/${serialNumber}_fb/POWER`);
  console.log('Result: ', result);
  return result;
};
