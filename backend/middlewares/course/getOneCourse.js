const mongoose = require("mongoose");
const { Course } = require("../../db/db.js");

async function getOneCourse(req, res) {
    try {
        const { id } = req.params;

        // Validate course ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required."
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID."
            });
        }

        // Fetch course
        const course = await Course
            .findById(id)
            .select(
                "name description isPaid price language prerequisite " +
                "category skills author authorName youtubePlaylistId videos " +
                "totalEnrolled createdAt updatedAt"
            )
            .lean();

        // Course not found
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully.",
            course
        });

    } catch (error) {
        console.error("Get course error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch course."
        });
    }
}

module.exports = {
    getOneCourse
};
