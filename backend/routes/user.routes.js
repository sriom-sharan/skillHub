var express = require('express');
var router = express.Router();
var {checkLoginMiddleware} = require("../middlewares/checkLoginMiddleware.js")
var {getUserProfile} = require("../controllers/user.controller.js")
/* GET user . */
// router.get('/:userId', function(req, res, next) {
//   res.send('respond with a resource');
// });
// Update User
router.put('/:userId', function(req, res, next) {
  res.send('Update User');
});

// Get user profile
router.get("/profile", checkLoginMiddleware, getUserProfile);

module.exports = router;
