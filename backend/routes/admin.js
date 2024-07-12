var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {
    res.send('Get all stats');
});

/* GET All Users. */
router.get('/users', function(req, res, next) {
  res.send('Get all Users');
});

/* GET All Courses. */
router.get('/courses', function(req, res, next) {
  res.send('Get all Courses');
});

module.exports = router;