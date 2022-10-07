const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.adminAuth = function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        const user = await userModel.findById(decodedToken.id);
        if (user.role === 'admin') {
          next();
        } else {
          res.json({
            status: 'error',
            message: 'You are not authorized to view this page',
          });
        }
      }
    });
  } else {
    res.json({ status: 'error', message: 'You are not authorized to view this page' });
  }
};
