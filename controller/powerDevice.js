require('dotenv').config();

const mqtt = require('mqtt');

module.exports = powerDevice = async (serialNumber, command) => {
  try {
    // TODO: Handle server crash when authentication fails
    console.log('Attempting MQTT connection with', process.env.MQTT_URL);
    var mqttRes = '?';
    const client = mqtt.connect(
      `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
      {
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
      }
    );
    client.on('connect', function() {
      console.log(
        `${command === '2' ? `Toggling` : `Powering ${command}`} device`,
        serialNumber
      );
      client.publish(`cmnd/${serialNumber}_fb/power`, command);

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

    mensaje = () =>
      client.on('message', async function(topic, payload) {
        // message is Buffer
        if (topic === `stat/${serialNumber}_fb/POWER`) {
          console.log(
            `Response from device ${serialNumber}, topic ${topic} is: ${payload.toString()}`
          );
          let status = ` ${payload.toString()}`;
          client.end();
          if (status === ' OFF') {
            console.log('Entró al OFF');
            return (mqttRes = mqttRes + 'OFF');
          } else {
            console.log('Entró al ON');
            return (mqttRes = mqttRes + 'ON');
          }
          // return (deviceRes = { serialNumber, deviceStatus: payload.toString() });
        }
        // TODO: Return error on message timeout
      });

    console.log('Outside response: ', mqttRes);

    // mqttRes = deviceRes;
    // return mqttRes;
    return { serialNumber, deviceStatus: 'OK' };
  } catch (err) {
    console.error(err.message);
    return err;
  }
};