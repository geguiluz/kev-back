const express = require('express');
const router = express.Router();

const mqtt = require('mqtt');
const client = mqtt.connect('tcp://192.168.15.104');

const auth = require('../middleware/auth');

// @route     POST api/devices
// @desc      Add new device
// @access    Private

router.patch('/toggleDevice', auth, (req, res) => {
  const { serialNumber } = req.body;

  try {
    console.log('Toggling device', serialNumber);

    client.on('connect', function() {
      client.subscribe('presence', function(err) {
        if (!err) {
          client.publish('cmnd/DVES_5A55AA_fb/power', 2);
        }
      });
    });

    client.on('message', function(topic, payload) {
      // message is Buffer
      console.log(payload.toString());
      client.end();
    });

    return res.json({ serialNumber, status: 'OFF' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
