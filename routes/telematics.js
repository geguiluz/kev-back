const express = require('express');

const router = express.Router();

const mqtt = require('mqtt');

require('dotenv').config();

const auth = require('../middleware/auth');

const toggleDevice = require('../controller/toggleDevice');

// @route     POST api/devices
// @desc      Add new device
// @access    Private

router.post('/toggleDevice', auth, (req, res) => {
  const { serialNumber } = req.body;
  try {
    toggleDevice(serialNumber, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
