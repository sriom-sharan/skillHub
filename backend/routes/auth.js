var express = require("express");
const zod = require("zod");
const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const { signupMiddleware } = require("../middlewares/auth/signupMiddleware.js");
const {
  checkLoginMiddleware,
} = require("../middlewares/auth/checkLoginMiddleware.js");
const { loginMiddleware } = require("../middlewares/auth/loginMiddleware.js");
const { sendEmail } = require("../middlewares/sendMail.js");
const { forgetPassword } = require("../middlewares/auth/forgetPassword.js");
const { changePassword } = require("../middlewares/auth/changePassword.js");
const {validateOTP} = require("../middlewares/auth/otpValidate.js")

// const otp = crypto.randomInt(100000, 999999);
const saltRounds = 10;

var router = express.Router();

/* SignUp . */
router.post("/signup", signupMiddleware)
// Login
router.post("/login", loginMiddleware);
// Verify Email
router.post("/verify-account",validateOTP)
// Forget Password
router.post("/forget-password",forgetPassword);
router.post("/change-password/:token",changePassword);

// Get me
router.get("/me", async function (req, res, next) {
  res.send("Get my details");
});

module.exports = router;
