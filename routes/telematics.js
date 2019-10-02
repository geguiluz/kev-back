const express = require('express');

const router = express.Router();

const mqtt = require('mqtt');

require('dotenv').config();

const auth = require('../middleware/auth');

const powerDevice = require('../controller/powerDevice');
const generalShutoff = require('../controller/generalShutoff');

// @route     POST api/telematics/toggleDevice
// @desc      Toggles device to its opposite state (ON/OFF)
// @access    Private

router.post('/toggleDevice', auth, async (req, res) => {
  const { serialNumber } = req.body;
  try {
    deviceRes = await powerDevice(serialNumber, '2');
    res.json(deviceRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/powerDevice
// @desc      Powers device ON or OFF specifically
// @access    Private

router.post('/powerDevice', auth, async (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    deviceRes = await powerDevice(serialNumber, command);
    res.json(deviceRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/generalShutoff
// @desc      Turns off all user devices
// @access    Private

router.post('/generalShutoff', auth, async (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    res = await generalShutoff(req.user.id, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics
// @desc      Runs the home alone schedule
// @access    Private

router.post('/runHomeAlone', auth, (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    // TODO:
    // 1 - Get all device ID's and commands from the database
    // 2 - Generate a random interval in order to toggle actions
    // 3 - Call powerDevice for each serial number
    // powerDevice(serialNumber, command, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
