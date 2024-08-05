const { Course,Enrollment } = require("../../db/db.js");

async function getPopularCourses(req,res){
    try {
        const results = await Enrollment.aggregate([
          // Group by course ID and count the number of enrollments
          { $group: { _id: '$course', userCount: { $sum: 1 } } },
          // Lookup course details from the Course collection
          { $lookup: {
            from: 'courses', // Name of the collection for Course model
            localField: '_id',
            foreignField: '_id',
            as: 'courseDetails'
          }},
          // Unwind the courseDetails array to get the course information
          { $unwind: '$courseDetails' },
          // Project the desired fields
          { $project: {
            _id: 0,
            courseId: '$_id',
            courseName: '$courseDetails.name',
            category:'$courseDetails.category',
            videos:'$courseDetails.videos',
            authorName:'$courseDetails.authorName',
            userCount: 1
          },
          
        },
        {$sort:{userCount:-1}}

        ]);
        
        console.log('Courses with user counts:', results);
        return res.json(results);
      } catch (error) {
        console.error('Error fetching courses with user counts:', error);
        return res.status(400).json({error})
        throw error;
      }
}
module.exports = {getPopularCourses}