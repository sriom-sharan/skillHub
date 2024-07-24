var express = require('express');
var router = express.Router();
const {
    checkLoginMiddleware,
  } = require("../middlewares/auth/checkLoginMiddleware.js");

  const {createCourse} = require('../middlewares/course/createCourse.js')
  const {enrollCourse} = require('../middlewares/course/enrollCourses.js')
  const {getAllCourses} = require('../middlewares/course/getAllCourses.js')
 
// Get all Courses
router.get('/', getAllCourses);

// Create Course
router.post('/create-cousre',checkLoginMiddleware,createCourse)

// Get One course
router.get('/:courseId',(req,res,next)=>{
    const courseId = req.params.courseId;
        res.send('One Courses '+courseId);
});

// Enroll in Course
router.put('/enroll',checkLoginMiddleware,enrollCourse);

// Delete the Course
router.delete('/:courseId',(req,res,next)=>{
    res.send('Delete Course');
});


module.exports = router