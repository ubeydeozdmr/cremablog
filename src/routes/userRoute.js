const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { adminAuth } = require('../utils/adminAuth');

// GET ALL USERS
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ status: 'success', data: users });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or Password not present',
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: 'Login not successful',
        error: 'User not found',
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: maxAge,
          });

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });

          res.status(201).json({
            message: 'Login successful',
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          res.status(401).json({
            status: 'error',
            message: 'Login not successful',
            error: 'Password incorrect',
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Password cannot be less than 6 characters' });
  }
  try {
    bcrypt.hash(password, 10).then(async hash => {
      await userModel
        .create({
          name,
          email,
          password: hash,
        })
        .then(user => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: maxAge,
          });

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });

          res.status(201).json({
            message: 'User successfully created',
            user,
          });
        });
    });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
});

module.exports = router;
