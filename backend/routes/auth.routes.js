var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/auth.controller")

/* SignUp . */
router.post("/signup", AuthController.signup)

// Login
router.post("/login", AuthController.login);

// Verify Email
router.post("/verify-account",AuthController.validateOTP)

// Forget Password
router.post("/forget-password",AuthController.forgetPassword);

// Change Password
router.post("/change-password/:token",AuthController.changePassword);


module.exports = router;