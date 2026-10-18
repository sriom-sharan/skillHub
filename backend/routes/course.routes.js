var express = require('express');
var router = express.Router();
const {
    checkLoginMiddleware,
  } = require("../middlewares/checkLoginMiddleware.js");

const CoursesController = require("../controllers/course.controller.js")

// Get all Courses
router.get('/', CoursesController.getAllCourses);

// Create Course
router.post('/create-course',checkLoginMiddleware,CoursesController.createCourse)

// Get One course
router.get('/course-detail/:id',CoursesController.getCourseDetails);

// Enroll in Course
router.put('/enroll',checkLoginMiddleware,CoursesController.enrollCourse);

// Get Enrollment Status
router.get( "/enroll/:courseId", checkLoginMiddleware, CoursesController.getCourseEnrollmentStatus );

// Delete the Course
router.delete('/:courseId',(req,res,next)=>{
    res.send('Delete Course');
});

// Get Popular Courses
router.get('/popular',CoursesController.getPopularCourses);

// Get Search Result
router.post('/search',CoursesController.searchCourses);

module.exports = router