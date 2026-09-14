const express = require("express");
const zod = require("zod");
const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendEmail } = require("../sendMail.js");
const crypto = require("crypto");

const saltRounds = 10;

// SignUp Schema
const signupSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must not exceed 30 characters"),

  email: zod
    .string()
    .trim()
    .email("Please enter a valid email address")
    .transform((email) => email.toLowerCase()),

  password: zod
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must not exceed 16 characters"),
});

async function signupMiddleware(req, res, next) {
  // Validate request body
  const response = signupSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: response.error.flatten().fieldErrors,
    });
  }

  // Use validated data
  const { name, email, password } = response.data;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate OTP
    const otp = crypto.randomInt(100000, 1000000);

    // Save OTP
    await User.findByIdAndUpdate(user._id, {
      validationCode: otp,
      validationCodeCreatedAt: new Date(),
    });

    // Create authentication token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
    );

    // Send OTP email
    await sendEmail(
      user.email,
      user.name,
      "Validation of Account",
      `
        <h2>Validate Your SkillHub Account</h2>
        <p>Hello ${user.name},</p>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p><strong>Do not share this OTP with anyone.</strong></p>
      `,
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully. OTP has been sent to your email.",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { signupMiddleware };