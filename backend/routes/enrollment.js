var express = require('express');
var router = express.Router();

const { getCourseEnrollmentStatus } = require("../middlewares/course/getCourseEnrollmentStatus"); 
const { checkLoginMiddleware } = require("../middlewares/auth/checkLoginMiddleware");

/* GET Enrollments. */
router.get('/', function(req, res, next) {
  res.send('Get all enrolled students')
});
/* Send Enrollment Id. */
router.post('/', function(req, res, next) {
  res.send(' Send enrolled student Id')
});
router.get( "/:courseId", checkLoginMiddleware, getCourseEnrollmentStatus );

module.exports = router;