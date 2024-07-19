var express = require('express');
var router = express.Router();
const {
    checkLoginMiddleware,
  } = require("../middlewares/auth/checkLoginMiddleware.js");

  const {createCourse} = require('../middlewares/course/createCourse.js')
  const {enrollCourse} = require('../middlewares/course/enrollCourses.js')
 

router.get('/',(req,res,next)=>{
    res.send('All Courses');
});

router.post('/create-cousre',checkLoginMiddleware,createCourse)

router.get('/:courseId',(req,res,next)=>{
    const courseId = req.params.courseId;
        res.send('One Courses '+courseId);
});

router.put('/enroll',checkLoginMiddleware,enrollCourse);

router.delete('/:courseId',(req,res,next)=>{
    res.send('Delete Course');
});

router.get('/:courseId/content',(req,res,next)=>{
    res.send('Courses Description');

});

module.exports = router