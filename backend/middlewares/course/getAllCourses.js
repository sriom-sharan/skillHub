const { Course } = require("../../db/db.js");

async function getAllCourses(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 12, 1),
      50
    );

    const skip = (page - 1) * limit;

    const [courses, totalCourses] = await Promise.all([
      Course.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Course.countDocuments({})
    ]);

    if (totalCourses === 0) {
      return res.status(200).json({
        courses: [],
        pagination: {
          page,
          limit,
          totalCourses: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      });
    }

    const totalPages = Math.ceil(totalCourses / limit);

    return res.status(200).json({
      courses,
      pagination: {
        page,
        limit,
        totalCourses,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching courses:", error);

    return res.status(500).json({
      message: "Failed to fetch courses"
    });
  }
}

module.exports = { getAllCourses };