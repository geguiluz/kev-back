const express = require('express');

const router = express.Router();

const mqtt = require('mqtt');

require('dotenv').config();

const auth = require('../middleware/auth');

const toggleDevice = require('../controller/toggleDevice');

// @route     POST api/telematics
// @desc      Toggles device to its opposite state (ON/OFF)
// @access    Private

router.post('/toggleDevice', auth, (req, res) => {
  const { serialNumber } = req.body;
  try {
    toggleDevice(serialNumber, '2', res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics
// @desc      Powers device ON or OFF specifically
// @access    Private

router.post('/powerDevice', auth, (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    toggleDevice(serialNumber, command, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics
// @desc      Powers device ON or OFF specifically
// @access    Private

router.post('/runSchedule', auth, (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    // TODO:
    // 1 - Get all device ID's and commands from the database
    // 2 - Generate a random interval in order to toggle actions
    // 3 - Call powerDevice for each serial number
    toggleDevice(serialNumber, command, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
