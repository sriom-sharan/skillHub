const express = require("express");
const zod = require("zod");
const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../sendMail.js");

async function forgetPassword(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Email required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email does not exist." });
    }

    const token = jwt.sign({ email, name: user.name }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    await sendEmail(
      email,
      user.name,
      "Change Password",
      `<p>Click on the link to change your password.</p><p>https://auth/skillhub-8nsp.onrender.com/forget-password/${token}</p>`
    );

    return res.json({ msg: "Password reset link has been sent to your email." });
  } catch (err) {
    console.error("Error in forgetPassword:", err); // Log the error for debugging

    // Log more details about the error
    console.error("Error stack:", err.stack);
    console.error("Error message:", err.message);
    console.error("Error name:", err.name);

    return res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
}

module.exports = { forgetPassword };
