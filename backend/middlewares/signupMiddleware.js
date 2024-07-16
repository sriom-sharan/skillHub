const express = require("express");
const zod = require("zod");
const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken"); 
require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const otp = crypto.randomInt(100000, 999999)
const saltRounds = 10;

// SignUp Schema
const signupSchema = zod.object({
  name: zod.string().min(3).max(30),
  email: zod.string().email(),
  password: zod.string().min(6).max(16),
});

async function signupMiddleware(req, res, next) {
  const body = req.body;

  // Checking the format of request obj is correct or not through zod.
  const response = signupSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }

  try {
    // Creating token for authenticate on every request.
    const token = jwt.sign(
      { name: body.name, email: body.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    // Hashing th password
    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    // Checking if email exist in DB
    const checkEmail = await User.findOne({ email: body.email });
    if (checkEmail) {
      console.log("Email is already in use.");
      return res.status(400).json({ msg: "Email is already in use." });
    }

    // Posting data to DB
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashPassword,
    });

     console.log(user);
     res.json({ msg: "Account created successfully", token });
     req.user = user;
     next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { signupMiddleware };
