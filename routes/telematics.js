const express = require('express');

const router = express.Router();

const mqtt = require('mqtt');

require('dotenv').config();

const auth = require('../middleware/auth');

const powerDevice = require('../controller/powerDevice');
const generalShutoff = require('../controller/generalShutoff');
const randomToggle = require('../controller/randomToggle');

// @route     POST api/telematics/toggleDevice
// @desc      Toggles device to its opposite state (ON/OFF)
// @access    Private

router.post('/toggleDevice', auth, async (req, res) => {
  const { serialNumber } = req.body;
  try {
    await powerDevice(serialNumber, '2', response => {
      res.json(response);
    });
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
    shutRes = await generalShutoff(req.user.id);
    res.json(shutRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/alexaShutoff
// @desc      Turns off all user devices
// @access    Private

router.post('/alexaShutoff', async (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    shutRes = await generalShutoff('5d95835ed44b2b8bc00fb47a');
    res.json(shutRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/randomToggle
// @desc      Toggles random devices
// @access    Private

router.post('/randomToggle', auth, async (req, res) => {
  const { serialNumber, command } = req.body;
  try {
    randRes = await randomToggle(req.user.id);
    res.json(randRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
