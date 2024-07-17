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

// const otp = crypto.randomInt(100000, 999999);
const saltRounds = 10;

var router = express.Router();

/* SignUp . */
router.post("/signup", signupMiddleware)// async (req, res) => {
//   const { name, email } = req.user;
//   sendEmail(
//     email,
//     name,
//     "Validation of Account",
//     `Your OTP is ${otp} <p>**Do not share this to anyone.**</p>`
//   );
//   const user = await User.findOneAndUpdate(
//     { email },
//     { validationCode: otp, validationCodeCreatedAt: new Date() },
//     {
//       new: true,
//     }
//   );
//   return res.json({ msg: "OTP has been sent to mail." });
//});

// Validate User via Otp

router.post("/validate-user", checkLoginMiddleware, async (req, res) => {
  const { otp } = req.body;
  const { email } = req.user;
  if (!otp) {
    return res.status(400).json({ msg: "otp not found" });
  }
  try {
    const valid = await User.find({ email, validationCode: otp });
    if (!valid) return res.status(400).json({ msg: "otp not matched" });
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      {
        new: true,
      }
    );
    return res.json({ msg: "Account Verified Successfully." });
  } catch (err) {
    return res.status(500).json({ msg: "Account Verified Failed." });
  }
});

// SignIn
router.post("/login", loginMiddleware);

// Forget Password
router.post("/forget-password",forgetPassword);
router.post("/change-password/:token",changePassword);

// Get me
router.get("/me", async function (req, res, next) {
  res.send("Get my details");
});

module.exports = router;
