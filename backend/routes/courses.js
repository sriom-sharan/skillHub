var express = require('express');
var router = express.Router();
const {
    checkLoginMiddleware,
  } = require("../middlewares/auth/checkLoginMiddleware.js");

  const {createCourse} = require('../middlewares/course/createCourse.js')
  const {enrollCourse} = require('../middlewares/course/enrollCourses.js')
  const {getAllCourses} = require('../middlewares/course/getAllCourses.js')
  const {getPopularCourses} = require('../middlewares/course/getPopular.js')
  const {searchCourses} = require('../middlewares/course/searchCourses.js')
 
// Get all Courses
router.get('/', getAllCourses);

// Create Course
router.post('/create-course',checkLoginMiddleware,createCourse)

// Get One course
// router.get('/:courseId',(req,res,next)=>{
//     const courseId = req.params.courseId;
//         res.send('One Courses '+courseId);
// });

// Enroll in Course
router.put('/enroll',checkLoginMiddleware,enrollCourse);

// Delete the Course
router.delete('/:courseId',(req,res,next)=>{
    res.send('Delete Course');
});

// Get Popular Courses
router.get('/popular',getPopularCourses);

// Get Search Result
router.get('/search',searchCourses);

module.exports = router