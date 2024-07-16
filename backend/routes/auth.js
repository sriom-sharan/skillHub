var express = require("express");
const zod = require("zod");
const { User } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const { signupMiddleware } = require("../middlewares/signupMiddleware.js");
const {
  checkLoginMiddleware,
} = require("../middlewares/checkLoginMiddleware.js");
const { loginMiddleware } = require("../middlewares/loginMiddleware.js");
const { sendEmail } = require("../middlewares/sendMail.js");



var router = express.Router();

/* SignUp . */
router.post("/signup", signupMiddleware,((req,res)=>{
  const {name,email} = req.user;
  sendEmail(email,name,'OTP is 6565',)
}));

// SignIn
router.post("/login", loginMiddleware);

// router.get('/check',checkLoginMiddleware);

// Get me
router.get("/me", async function (req, res, next) {
  res.send("Get my details");
});

module.exports = router;
