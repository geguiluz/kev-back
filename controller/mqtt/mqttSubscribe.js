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
        console.log(topic, subTopic);
        if (topic === subTopic) {
          console.log('Matching message received');
          resolve({ topic: topic, message: payload.toString() });
        }
      });
    } catch (err) {
      console.error(err.message);
      reject({ response: 'Server error' });
    }
  });
};
