const express = require("express");
const zod = require("zod");
const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

async function checkLoginMiddleware(req, res, next) {
  const headerAuth = req.headers.authorization;

  if (headerAuth && headerAuth.startsWith("Bearer")) {
    try {
      token = headerAuth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userDetail = await User.findOne({ email:decoded.email });
      if (!userDetail) {
        console.log("User not found");
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      req.user = userDetail; // Add the decoded user info to the request
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
}

module.exports = { checkLoginMiddleware };
