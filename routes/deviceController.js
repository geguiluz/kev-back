const express = require('express');
const router = express.Router();

const mqtt = require('mqtt');

const auth = require('../middleware/auth');

// @route     POST api/devices
// @desc      Add new device
// @access    Private

router.patch('/toggleDevice', auth, (req, res) => {
  const { serialNumber } = req.body;
  try {
    // TODO: Set MQTT Broker address in config or somewhere else
    const client = mqtt.connect('tcp://192.168.15.104');
    client.on('connect', function() {
      console.log('Toggling device', serialNumber);
      client.publish(`cmnd/${serialNumber}_fb/power`, '2');
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

    const message = client.on('message', function(topic, payload) {
      // message is Buffer
      console.log(
        `Response from device ${serialNumber}, topic ${topic} is: ${payload.toString()}`
      );
      client.end();
      return payload;
    });

    deviceStatus = message.toString();

    // console.log('payload: ', message);

    // TODO: Still need to solve issue with deviceStatus passing on an object
    // when called from postman:
    // {
    //   "serialNumber": "DVES_5A55AA",
    //   "deviceStatus": "[object Object]"
    // }
    return res.json({ serialNumber, deviceStatus });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
