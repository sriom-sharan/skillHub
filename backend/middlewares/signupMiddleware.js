const express = require('express');
const zod = require('zod');
const { User } = require('../db/db.js');
const jwt = require('jsonwebtoken'); // Correctly import jsonwebtoken
require("dotenv").config();
const bcrypt = require('bcrypt');

const saltRounds = 10;

// SignUp Schema
const signupSchema = zod.object({
  name: zod.string().min(3).max(30),
  email: zod.string().email(),
  password: zod.string().min(6).max(16)
});

async function signupMiddleware(req, res, next) {
  const body = req.body;
  const response = signupSchema.safeParse(body);

  if (!response.success) {
    return res.status(400).json({ msg: 'Invalid input credentials' });
  }

  try {
    const token = jwt.sign(
      { username: body.name, email: body.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashPassword,
    });

    console.log(user);
    return res.json({ msg: 'Account created successfully', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

module.exports = { signupMiddleware };
