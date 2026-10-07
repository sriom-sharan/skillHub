const { Course, User, Enrollment } = require("../../db/db.js");
const zod = require("zod");

const { getPlaylistDetail } = require("./getPlaylistDetail.js");

const courseSchema = zod.object({
    name: zod.string().min(3).max(60),

    description: zod.string().min(10),

    category: zod.enum([
        "Web Development",
        "Designing",
        "Mobile App Development",
        "Data Structures and Algorithms",
        "Data Analytics",
        "Data Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Cloud Computing",
        "Cybersecurity",
        "Blockchain",
        "Internet of Things",
        "Game Development",
        "DevOps",
        "Software Testing",
        "Database Management",
        "Networking",
        "Programming Languages",
        "IT & Software",
        "Digital Marketing",
        "Project Management",
        "Business",
        "Finance",
        "Personal Development",
        "Health & Fitness"
    ]),

    youtubePlaylistId: zod.string().min(1),

    skills: zod.string().min(1),

    language: zod.enum([
        "English",
        "Hindi",
        "Hinglish"
    ]),

    prerequisite: zod.string().optional()
});

async function createCourse(req, res) {
    const { _id, name: authorName } = req.user;

    // Validate request body
    const response = courseSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid course data",
            errors: response.error.flatten().fieldErrors
        });
    }

    const {
        name,
        description,
        category,
        skills,
        youtubePlaylistId,
        language,
        prerequisite
    } = response.data;

    try {
        // Check if playlist already exists
        const existingCourse = await Course.findOne({
            youtubePlaylistId
        }).select("_id");

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "This YouTube playlist has already been added."
            });
        }

        // Fetch playlist details from YouTube
        const videoDetails = await getPlaylistDetail(
            youtubePlaylistId
        );

        if (!videoDetails || videoDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found or contains no videos."
            });
        }

        // Extract video snippets
        const videos = videoDetails.map(
            (data) => data.snippet
        );

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
            prerequisite
        });

        // Add course to creator's createdCourses
        await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    createdCourses: course._id
                }
            }
        );

        // Create creator enrollment
        await Enrollment.create({
            course: course._id,
            status: "created",
            user: _id
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully.",
            courseId: course._id
        });

    } catch (error) {
        console.error("Create course error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create course."
        });
    }
}

module.exports = {
    createCourse
};
