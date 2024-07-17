const express = require("express");
const zod = require("zod");
const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function changePassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  if (!token) {
    return res.status(400).json({ msg: "token not found" });
  }
  if (!password) {
    return res.status(400).json({ msg: "password not found" });
  }
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  if (!decode) {
    return res.status(400).json({ msg: "invalid token" });
  }
  try {
    const user = await User.findOne({ email: decode.email });
    const hashPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashPassword;
    await user.save();
    return res.json({msg:'Password Changed Successfully'})
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {changePassword}