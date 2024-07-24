const { Course } = require("../../db/db.js");

async function getAllCourses(req,res){
    const courses = await Course.find({})
    if(!courses)return res.json({msg:"No courses Available"})
    return res.json({courses})
}
module.exports = {getAllCourses}