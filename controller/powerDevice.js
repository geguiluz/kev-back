require('dotenv').config();

const mqtt = require('async-mqtt');

const mqttPost = require('./mqtt/mqttPost');
const mqttSubscribe = require('./mqtt/mqttSubscribe');

module.exports = powerDevice = async (_id, serialNumber, command) => {
  console.log(
    `${command === '2' ? `Toggling` : `Powering ${command}`} device`,
    serialNumber
  );
  // TODO: Handle server crash when authentication fails
  console.log('Attempting MQTT connection with', process.env.MQTT_URL);
  const client = mqtt.connect(
    `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
    {
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASSWORD,
    }
  );
  await mqttPost(client, `cmnd/${serialNumber}_fb/power`, command);
  const mqttResponse = await mqttSubscribe(
    client,
    `stat/${serialNumber}_fb/POWER`
  );
  await client.end();
  // The response expected by the front end should be something like this:
  // {
  //   "_id": "XXXXXXXXXX",
  //   "serialNumber": "DVES_5A55AA",
  //   "deviceStatus": "OFF"
  // }
  response = { _id, serialNumber, deviceStatus: mqttResponse.message };
  return response;
};
