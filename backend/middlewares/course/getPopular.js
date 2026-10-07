const { Course, Enrollment } = require("../../db/db.js");

async function getPopularCourses(req, res) {
    try {
        const results = await Enrollment.aggregate([
            // Count enrollments for each course
            {
                $group: {
                    _id: "$course",
                    userCount: { $sum: 1 }
                }
            },

            // Get course details
            {
                $lookup: {
                    from: Course.collection.name,
                    localField: "_id",
                    foreignField: "_id",
                    as: "course"
                }
            },

            // Convert course array into an object
            {
                $unwind: "$course"
            },

            // Return required fields
            {
                $project: {
                    _id: 0,
                    courseId: "$_id",
                    name: "$course.name",
                    description: "$course.description",
                    category: "$course.category",
                    skills: "$course.skills",
                    language: "$course.language",
                    authorName: "$course.authorName",
                    videos: "$course.videos",
                    isPaid: "$course.isPaid",
                    price: "$course.price",
                    totalEnrolled: "$userCount",
                    createdAt: "$course.createdAt"
                }
            },

            // Most enrolled courses first
            {
                $sort: {
                    totalEnrolled: -1
                }
            },

            // Only return top 4
            {
                $limit: 4
            }
        ]);

        return res.status(200).json({
            success: true,
            courses: results
        });

    } catch (error) {
        console.error("Error fetching popular courses:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch popular courses."
        });
    }
}

module.exports = { getPopularCourses };
