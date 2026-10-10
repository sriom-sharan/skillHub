
const zod = require("zod");
const { User } = require("../../db/db.js");
const bcrypt = require("bcrypt");

const otpSchema = zod.object({
  otp: zod.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  email: zod
    .string()
    .trim()
    .email()
    .transform((email) => email.toLowerCase()),
});

async function validateOTP(req, res) {
  const response = otpSchema.safeParse(req.body);

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

module.exports = { validateOTP };
