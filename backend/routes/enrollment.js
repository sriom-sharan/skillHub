var express = require('express');
var router = express.Router();

/* GET Enrollments. */
router.get('/', function(req, res, next) {
  res.send('Get all enrolled students')
});
/* Send Enrollment Id. */
router.post('/', function(req, res, next) {
  res.send(' Send enrolled student Id')
});

module.exports = router;