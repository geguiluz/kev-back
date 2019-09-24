const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Device = require('../models/Device');

// @route     GET api/devices
// @desc      Get all devices for user
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    // Since we're using the auth middleware, we get access to the user
    // console.log(req.user);
    const devices = await Device.find({ user: req.user.id });
    // console.log(devices);
    res.json(devices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/devices
// @desc      Add new device
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { serialNumber, name, macAddress, isDisabled, type } = req.body;

    try {
      const newDevice = new Device({
        serialNumber,
        name,
        macAddress,
        isDisabled,
        type,
        user: req.user.id,
      });

      const device = await newDevice.save();
      res.json(device);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/devices/:id
// @desc      Update device
// @access    Private

router.put('/:id', auth, async (req, res) => {
  const { serialNumber, name, macAddress, isDisabled, type } = req.body;

  // Build the device object
  const deviceFields = {};
  if (serialNumber) deviceFields.serialNumber = serialNumber;
  if (name) deviceFields.name = name;
  if (macAddress) deviceFields.macAddress = macAddress;
  if (isDisabled) deviceFields.isDisabled = isDisabled;
  if (type) deviceFields.type = type;

  try {
    let device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ msg: 'Device not found' });

    // Make sure user does own device
    if (device.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // { new: true } ----- This option allows us to create if it doesn't exist
    device = await Device.findByIdAndUpdate(
      req.params.id,
      { $set: deviceFields },
      { new: true }
    );
    res.json(device);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/devices/:id
// @desc      Update device
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  const { serialNumber, name, macAddress, isDisabled, type } = req.body;

  // Build the device object
  const deviceFields = {};
  if (serialNumber) deviceFields.serialNumber = serialNumber;
  if (name) deviceFields.name = name;
  if (macAddress) deviceFields.macAddress = macAddress;
  if (isDisabled) deviceFields.isDisabled = isDisabled;
  if (type) deviceFields.type = type;

  try {
    let device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ msg: 'Device not found' });

    // Make sure user does own device
    if (device.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // { new: true } ----- This option allows us to create if it doesn't exist
    await Device.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Device removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
