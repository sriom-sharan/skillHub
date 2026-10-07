const mongoose = require("mongoose");
const { Enrollment } = require("../../db/db.js");

async function getCourseEnrollmentStatus(req, res) {
    try {
        const { courseId } = req.params;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID."
            });
        }

        const enrollment = await Enrollment.findOne({
            user: userId,
            course: courseId
        })
        .select("status enrollmentDate rating")
        .lean();

        return res.status(200).json({
            success: true,
            enrolled: !!enrollment,
            enrollment: enrollment || null
        });

    } catch (error) {
        console.error("Get enrollment status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to check enrollment status."
        });
    }
}

module.exports = { getCourseEnrollmentStatus };
