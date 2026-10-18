const { Course, User, Enrollment } = require("../db/db.js");
const CourseSchema = require("../schemas/course.schemas.js");
const mongoose = require("mongoose");
const { getPlaylistDetail } = require("../services/getYTPlaylistDetatils.js");

async function createCourse(req, res) {
  const { _id, name: authorName } = req.user;

  // Validate request body
  const response = CourseSchema.courseSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid course data",
      errors: response.error.flatten().fieldErrors,
    });
  }

  
  let {
    name,
    description,
    category,
    skills,
    youtubePlaylistId,
    language,
    prerequisite,
  } = response.data;

youtubePlaylistId = youtubePlaylistId.split("&")[0].trim()

  try {
    // Check if playlist already exists
    const existingCourse = await Course.findOne({
      youtubePlaylistId,
    }).select("_id");

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "This YouTube playlist has already been added.",
      });
    }

    // Fetch playlist details from YouTube
    const videoDetails = await getPlaylistDetail(youtubePlaylistId);

    if (!videoDetails || videoDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or contains no videos.",
      });
    }

    // Extract video snippets
    const videos = videoDetails.map((data) => data.snippet);

    // Create course
    const course = await Course.create({
      name,
      description,
      category,
      skills,
      authorName,
      author: _id,
      youtubePlaylistId,
      videos,
      language,
      prerequisite,
    });

    // Add course to creator's createdCourses
    await User.findByIdAndUpdate(_id, {
      $push: {
        createdCourses: course._id,
      },
    });

    // Create creator enrollment
    await Enrollment.create({
      course: course._id,
      status: "created",
      user: _id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      courseId: course._id,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course.",
    });
  }
}

async function enrollCourse(req, res, next) {
  const { courseId } = req.body;
  console.log(req.user);
  const { _id } = req.user;

  if (!courseId) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }
  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      [
        {
          $set: {
            enrolledUsers: { $concatArrays: ["$enrolledUsers", [_id]] },
            totalEnrolled: {
              $size: { $concatArrays: ["$enrolledUsers", [_id]] },
            },
          },
        },
      ],
      { new: true }, // This option returns the modified document
    );
    if (!course) {
      return res.status(400).json({ msg: "Course Id is incorrect" });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }
    console.log(course);
    const enroll = await Enrollment.create({
      course: course._id,
      status: "enrolled",
      user: _id,
    });
    console.log(enroll);
    await User.findOneAndUpdate(_id, {
      $push: { enrolledCourses: course._id },
    });
    return res.json({ msg: "Enrolled in course successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}

async function getAllCourses(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);

    const skip = (page - 1) * limit;

    const [courses, totalCourses] = await Promise.all([
      Course.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),

      Course.countDocuments({}),
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
          hasPreviousPage: false,
        },
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
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);

    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
}

async function getCourseEnrollmentStatus(req, res) {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    })
      .select("status enrollmentDate rating")
      .lean();

    return res.status(200).json({
      success: true,
      enrolled: !!enrollment,
      enrollment: enrollment || null,
    });
  } catch (error) {
    console.error("Get enrollment status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check enrollment status.",
    });
  }
}

async function getCourseDetails(req, res) {
  try {
    const { id } = req.params;

    // Validate course ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    // Fetch course
    const course = await Course.findById(id)
      .select(
        "name description isPaid price language prerequisite " +
          "category skills author authorName youtubePlaylistId videos " +
          "totalEnrolled createdAt updatedAt",
      )
      .lean();

    // Course not found
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully.",
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course.",
    });
  }
}

async function getPopularCourses(req, res) {
  try {
    const results = await Enrollment.aggregate([
      // Count enrollments for each course
      {
        $group: {
          _id: "$course",
          userCount: { $sum: 1 },
        },
      },

      // Get course details
      {
        $lookup: {
          from: Course.collection.name,
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },

      // Convert course array into an object
      {
        $unwind: "$course",
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
          createdAt: "$course.createdAt",
        },
      },

      // Most enrolled courses first
      {
        $sort: {
          totalEnrolled: -1,
        },
      },

      // Only return top 4
      {
        $limit: 4,
      },
    ]);

    return res.status(200).json({
      success: true,
      courses: results,
    });
  } catch (error) {
    console.error("Error fetching popular courses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular courses.",
    });
  }
}

async function searchCourses(req, res) {
  try {
    const searchString = req.body.searchString; // Ensure the search string is properly extracted from the request body
    console.log(req);

    if (!searchString || typeof searchString !== "string") {
      return res.status(400).json({ msg: "Invalid search string" }); // Handle invalid or missing search string
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: searchString, $options: "i" } },
        { skills: { $regex: searchString, $options: "i" } },
        { category: { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } },
        // Add more fields as needed
      ],
    }).limit(10);

    if (courses.length === 0) {
      return res.json({ msg: "No courses available" }); // Use appropriate status code for no results
    }

    return res.json({ courses }); // Return the found courses
  } catch (error) {
    console.error("Error searching courses:", error); // Log the error for debugging
    return res.status(500).json({ msg: "Server error" }); // Handle server errors
  }
}

module.exports = {
  enrollCourse,
  createCourse,
  getAllCourses,
  getCourseEnrollmentStatus,
  getCourseDetails,
  getPopularCourses,
  searchCourses,
};
