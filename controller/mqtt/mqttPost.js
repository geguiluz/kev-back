require('dotenv').config();

const mqtt = require('async-mqtt');

module.exports = mqttPost = async (topic, message) => {
  return new Promise((resolve, reject) => {
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
      client.on('connect', async () => {
        console.log('Connection established');
        await client.publish(topic, message);

        await client.end();

        console.log('Message published');
      });
      resolve({ response: 'Message published' });
    } catch (err) {
      console.error(err.message);
      reject({ response: 'Message failed' });
      // process.exit();
    }
  });
};
