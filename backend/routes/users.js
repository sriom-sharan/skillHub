var express = require('express');
var router = express.Router();

/* GET user . */
router.get('/:userId', function(req, res, next) {
  res.send('respond with a resource');
});
// Update User
router.put('/:userId', function(req, res, next) {
  res.send('Update User');
});


module.exports = router;
