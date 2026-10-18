const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const AuthSchema = require("../schemas/auth.schemas.js")
const crypto = require("crypto");
const { sendEmail } = require("../services/sendMail.js");

const saltRounds = 10;



async function signup(req, res) {
  const response = AuthSchema.signupSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(401).json({
      success: false,
      message: "Validation failed",
      errors: response.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = response.data;

  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashPassword,
        isVerified: false,
      });
    } else {
      // Update details for an existing unverified account.
      user.name = name;
      user.password = hashPassword;
    }

    // Generate a six-digit OTP and hash it.
    const otp = crypto.randomInt(100000, 1000000);
    const otpHash = await bcrypt.hash(String(otp), saltRounds);

    user.validationCode = otpHash;
    user.validationCodeCreatedAt = new Date();

    await user.save();

    // Do not issue an authentication JWT before verification.
    await sendEmail(
      user.email,
      user.name,
      "Verify Your SkillHub Account",
      `
        <h2>Verify Your SkillHub Account</h2>
        <p>Hello ${user.name},</p>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code expires in 5 minutes.</p>
        <p><strong>Do not share this code with anyone.</strong></p>
      `
    );

    return res.status(201).json({
      success: true,
      message: "Verification code sent. Please verify your email.",
    });
  } catch (error) {
    console.error("Signup error:", error.code || error.name);

    return res.status(500).json({
      success: false,
      message: "Unable to complete signup. Please try again.",
    });
  }
}



async function validateOTP(req, res) {
  const response = AuthSchema.otpSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: response.error.flatten().fieldErrors,
    });
  }

  const { otp, email } = response.data;

  try {
    const user = await User.findOne({ email });

    if (!user || user.isVerified || !user.validationCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // Ensure an OTP timestamp exists.
    if (!user.validationCodeCreatedAt) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // OTP expires after 5 minutes.
    const otpAge = Date.now() -
      new Date(user.validationCodeCreatedAt).getTime();

    if (otpAge < 0 || otpAge > 5 * 60 * 1000) {
      user.validationCode = null;
      user.validationCodeCreatedAt = null;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(
      String(otp),
      user.validationCode
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Activate account and consume OTP.
    user.isVerified = true;
    user.validationCode = null;
    user.validationCodeCreatedAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error(
      "OTP verification error:",
      error.code || error.name
    );

    return res.status(500).json({
      success: false,
      message: "Unable to complete OTP verification. Please try again.",
    });
  }
}


async function login(req, res) {
  const body = req.body;

  // Checking the format of request obj is correct or not through zod.
  const response = AuthSchema.loginSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid email" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.SECRET_KEY
    );

    console.log("Login successful");
    return res.json({ msg: "Login successful.", token });
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}


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

    const token = jwt.sign({ email, name: user.name }, process.env.SECRET_KEY);

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


module.exports={
  login,
  signup,
  changePassword,
  forgetPassword,
  validateOTP
}