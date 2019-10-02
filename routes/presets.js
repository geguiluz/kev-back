const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Preset = require('../models/Preset');

// @route     GET api/presets
// @desc      Get all presets for user
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    // Since we're using the auth middleware, we get access to the user
    // console.log(req.user);
    const presets = await Preset.find({ user: req.user.id });
    // console.log(presets);
    res.json(presets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/presets
// @desc      Add new preset
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('presetName', 'Preset name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { presetName, type, isActive, actions } = req.body;

    try {
      const newPreset = new Preset({
        presetName,
        type,
        isActive,
        actions,
        user: req.user.id,
      });

      const preset = await newPreset.save();
      res.json(preset);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/presets/:id
// @desc      Update preset
// @access    Private

router.put('/:id', auth, async (req, res) => {
  const { presetName, type, isActive, user, actions } = req.body;

  // Build the preset object
  // if (XX) presetFields.XX = XX;
  const presetFields = {};
  if (presetName) presetFields.presetName = presetName;
  if (type) presetFields.type = type;
  if (isActive) presetFields.isActive = isActive;
  if (user) presetFields.user = user;
  if (actions) presetFields.actions = actions;

  try {
    let preset = await Preset.findById(req.params.id);
    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user does own preset
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // { new: true } ----- This option allows us to create if it doesn't exist
    preset = await Preset.findByIdAndUpdate(
      req.params.id,
      { $set: presetFields },
      { new: true }
    );
    res.json(preset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/presets/:id
// @desc      Update preset
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let preset = await Preset.findById(req.params.id);
    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user does own device
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Preset.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Preset removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
