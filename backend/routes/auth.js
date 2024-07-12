var express = require('express');
const zod = require('zod');
const {User}  = require('../db/db.js')

var router = express.Router();

// SignUp Schema
const signupSchema = zod.object({
    name:zod.string().min(3).max(30),
    email:zod.string().email(),
    password:zod.string().min(6).max(16)
})

/* SignUp . */
router.post('/signup', async function(req, res, next) {
  const body = req.body;
  const response = signupSchema.safeParse(body);
  if(!response.success){
    return res.status(400).json({msg:'invalid input crediantials'})
  }
  await User.create({
    name:body.name,
    email:body.email,
    password:body.password,
  })
  .then((user)=>console.log(user))
  .catch((error)=>console.log(error))

  res.send('respond with a resource');
});
// SignIn
router.post('/login', async function(req, res, next) {
  res.send('Update User');
});

// Get me
router.get('/me', async function(req, res, next) {
  res.send('Get my details');
});


module.exports = router;
