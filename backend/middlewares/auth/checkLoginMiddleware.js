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
      req.user = decoded; // Add the decoded user info to the request
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
