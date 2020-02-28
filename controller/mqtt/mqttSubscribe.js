require('dotenv').config();

module.exports = mqttSubscribe = async (client, subTopic) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.on('connect', async () => {
        await client.subscribe(subTopic);
        console.log('Subscribed to topic', subTopic);
      });
      // TODO: Timeout
      client.on('message', async (topic, payload) => {
        // TODO: BugFix: we should look for a specific topic
        console.log('Message received');
        resolve({ topic: topic, message: payload.toString() });
      });
    } catch (err) {
      console.error(err.message);
      reject({ response: 'Server error' });
    }
  });
};
