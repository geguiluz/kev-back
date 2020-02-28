require('dotenv').config();

const mqtt = require('async-mqtt');

module.exports = mqttPost = async (client, topic, message) => {
  return new Promise((resolve, reject) => {
    try {
      client.on('connect', async () => {
        console.log('Connection established');
        await client.publish(topic, message);

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
