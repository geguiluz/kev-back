require('dotenv').config();

const mqtt = require('mqtt');

module.exports = toggleDevice = (serialNumber, response) => {
  // TODO: Handle server crash when authentication fails
  console.log('Attempting MQTT connection with', process.env.MQTT_URL);
  const client = mqtt.connect(
    `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
    {
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASSWORD,
    }
  );
  client.on('connect', function() {
    console.log('Toggling device', serialNumber);
    client.publish(`cmnd/${serialNumber}_fb/power`, '2');

    // Fake publish response (Test only)
    // client.publish(`stat/${serialNumber}_fb/POWER`, 'OFF');

    client.subscribe(`stat/${serialNumber}_fb/POWER`, function(err) {
      if (!err) {
        // TODO: Error handling
        console.log('No errors on publish');
      } else {
        // TODO: Send message if connection fails (don't know how to do that).
        // Next line is not firing off
        console.log('Cannot establish connection with MQTT Broker');
      }
    });
  });

  client.on('message', function(topic, payload) {
    // message is Buffer
    if (topic === `stat/${serialNumber}_fb/POWER`) {
      console.log(
        `Response from device ${serialNumber}, topic ${topic} is: ${payload.toString()}`
      );
      client.end();
      return response.json({ serialNumber, deviceStatus: payload.toString() });
    }
    // TODO: Return error on message timeout
  });
  return response;
};
