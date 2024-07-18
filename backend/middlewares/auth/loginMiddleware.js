const express = require("express");
const zod = require("zod");
const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Login Schema
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(16),
});

async function loginMiddleware(req, res, next) {
  const body = req.body;

  // Checking the format of request obj is correct or not through zod.
  const response = loginSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
    console.log("Login successful");
    return res.json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { loginMiddleware };
