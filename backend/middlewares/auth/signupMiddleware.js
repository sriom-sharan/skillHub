
const zod = require("zod");
const { User } = require("../../db/db.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../sendMail.js");

const saltRounds = 10;

const signupSchema = zod.object({
  name: zod.string().trim().min(3).max(30),
  email: zod
    .string()
    .trim()
    .email()
    .transform((email) => email.toLowerCase()),
  password: zod.string().min(6).max(16),
});

async function signupMiddleware(req, res) {
  const response = signupSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
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
        <p>Hello ${escapeHtml(user.name)},</p>
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

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

module.exports = { signupMiddleware };
