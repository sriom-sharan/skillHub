var express = require('express');
const zod = require('zod');
const {User}  = require('../db/db.js')
const jwt = require('jsonwebtoken')
const {signupMiddleware} = require('../middlewares/signupMiddleware.js')

var router = express.Router();


/* SignUp . */
router.post('/signup', signupMiddleware);
// SignIn
router.post('/login', async function(req, res, next) {
  res.send('Update User');
});

// Get me
router.get('/me', async function(req, res, next) {
  res.send('Get my details');
});


module.exports = router;
