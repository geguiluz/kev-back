const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// @route     POST api/devices
// @desc      Add new device
// @access    Private

router.patch('/toggleDevice', auth, (req, res) => {
  const { serialNumber } = req.body;

  try {
    console.log('Toggling device', serialNumber);
    return res.json({ status: 'OFF' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
