const { Course } = require("../../db/db.js");

async function getOneCourses(req, res) {
    const { id } = req.params; // Change this to req.params
    console.log(id);

    try{
      
      if (!id) return res.json({ msg: "No course_id found in request." });
      const course = await Course.findOne({ _id: id });
      if (!course) return res.json({ msg: "No courses Available" });
      return res.json({ course });
    }
    catch(error){
      return res.status(400).json({msg:"Invalid Id"})
    }
}
module.exports = {getOneCourses}