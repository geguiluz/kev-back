const express = require('express');

const router = express.Router();

const Preset = require('../models/Preset');

require('dotenv').config();

const auth = require('../middleware/auth');

const powerDevice = require('../controller/powerDevice');
const generalShutoff = require('../controller/generalShutoff');
const randomToggle = require('../controller/randomToggle');

// @route     POST api/telematics/toggleDevice
// @desc      Toggles device to its opposite state (ON/OFF)
// @access    Private

router.post('/toggleDevice', auth, async (req, res) => {
  const { _id, serialNumber } = req.body;
  try {
    await powerDevice(_id, serialNumber, '2', response => {
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
  try {
    shutRes = await generalShutoff(req.user.id);
    res.json(shutRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/alexaShutoff
// @desc      Turns off all user devices from Alexa skill
// @access    Public

router.post('/alexaShutoff', async (req, res) => {
  try {
    // TODO: Get user id linked to Alexa somehow
    shutRes = await generalShutoff('5d95835ed44b2b8bc00fb47a');
    res.json(shutRes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/telematics/alexa
// @desc      Toggles some user devices randomly from Alexa skill
// @access    Public

router.post('/alexaShuffle', async (req, res) => {
  const { isActive } = req.body;
  const presetFields = {};
  const presetID = '5d96dd59942ff6258d285d0c';
  presetFields.isActive = isActive;
  try {
    // 1 - Get my 'home-alone' type preset and set it to whatever the request
    // body says (true or false)
    // The scheduleTimer will take care of the rest
    let preset = await Preset.findById(presetID);
    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    preset = await Preset.findByIdAndUpdate(presetID, {
      $set: presetFields,
    });
    scheduleTimer(presetFields.isActive, 7);
    res.json(preset);
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
