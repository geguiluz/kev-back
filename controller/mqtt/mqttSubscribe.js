require('dotenv').config();

const mqtt = require('async-mqtt');

module.exports = mqttSubscribe = async subTopic => {
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
      // TODO Bug: Need to wait for connection using client.on('connect'...) before subscribing
      client.on('connect', async () => {
        await client.subscribe(subTopic);
        console.log('Subscribed to topic', subTopic);
      });
      // TODO: Timeout
      client.on('message', async (topic, payload) => {
        // TODO: BugFix: we should look for a specific topic
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
