const zod =  require("zod")


const signupSchema = zod.object({
  name: zod.string().trim().min(3).max(30),
  email: zod
    .string()
    .trim()
    .email()
    .transform((email) => email.toLowerCase()),
  password: zod.string().min(6).max(16),
});

// Login Schema
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(16),
});

// OTP Schema
const otpSchema = zod.object({
  otp: zod.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  email: zod
    .string()
    .trim()
    .email()
    .transform((email) => email.toLowerCase()),
});

module.exports = {
    loginSchema,
    signupSchema,
    otpSchema
}