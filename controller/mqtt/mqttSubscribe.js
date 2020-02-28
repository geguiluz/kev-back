require('dotenv').config();

const mqtt = require('async-mqtt');

console.log('Attempting MQTT connection with', process.env.MQTT_URL);
const client = mqtt.connect(
  `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
  {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
  }
);

module.exports = mqttSubscribe = async (subTopic, callback2) => {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: Handle server crash when authentication fails
      console.log('Attempting MQTT connection with', process.env.MQTT_URL);
      const client = mqtt.connect(
        `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
        {
          username: process.env.MQTT_USER,
          password: process.env.MQTT_PASSWORD,
        }
      );
      await client.subscribe(subTopic);
      console.log('Subscribed to topic', subTopic);
      // TODO: Timeout
      client.on('message', async (topic, payload) => {
        console.log('Getting message');

        await client.end();

        console.log('Message received');
        resolve({ topic: topic, message: payload.toString() });
      });
    } catch (err) {
      console.error(err.message);
      reject({ response: 'Server error' });
    }
  });
};
