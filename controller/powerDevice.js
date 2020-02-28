require('dotenv').config();

const mqttPost = require('./mqtt/mqttPost');
const mqttSubscribe = require('./mqtt/mqttSubscribe');

module.exports = powerDevice = async (_id, serialNumber, command) => {
  console.log(
    `${command === '2' ? `Toggling` : `Powering ${command}`} device`,
    serialNumber
  );
  await mqttPost(`cmnd/${serialNumber}_fb/power`, command);
  const mqttResponse = await mqttSubscribe(`stat/${serialNumber}_fb/POWER`);
  // The response expected by the front end should be something like this:
  // {
  //   "_id": "XXXXXXXXXX",
  //   "serialNumber": "DVES_5A55AA",
  //   "deviceStatus": "OFF"
  // }
  response = { _id, serialNumber, deviceStatus: mqttResponse.message };
  return response;
};
