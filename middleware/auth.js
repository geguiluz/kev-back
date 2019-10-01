require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // We'll use this only on protected routes
  // Get our token from our header
  const token = req.header('x-auth-token');
  const secret = process.env.JWT_SECRET;

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // console.log('Getting secret');
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    // console.log('Decoding complete');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    // console.log('Some error happened when getting secret and/or decoding');
  }
};
