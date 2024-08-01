const { Course,User,Enrollment } = require("../../db/db.js");

async function enrollCourse(req,res,next){
    const {courseId} = req.body;
    console.log(req.user);
  const {_id} = req.user;

  if (!courseId) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }
  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      [
        {
          $set: {
            enrolledUsers: { $concatArrays: ['$enrolledUsers', [_id]] },
            totalEnrolled: { $size: { $concatArrays: ['$enrolledUsers', [_id]] } }
          }
        }
      ],
      { new: true } // This option returns the modified document
    );
    if (!course) {
        return res.status(400).json({ msg: "Course Id is incorrect" });
      }
    console.log(course);
    const enroll = await Enrollment.create({
        course:course._id,
        status:'enrolled',
        user:_id,
      });
      console.log(enroll);
     await User.findOneAndUpdate(_id,{$push: { enrolledCourses: course._id }})
    return  res.json({ msg: "Enrolled in course successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}

module.exports = {enrollCourse}