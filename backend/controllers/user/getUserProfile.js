const {
    User,
    Course,
    Enrollment
} = require("../../db/db.js");

async function getUserProfile(req, res) {
    try {
        // -----------------------------------
        // 1. Check authenticated user
        // -----------------------------------
        const userId = req.user?._id;
            console.log("🔥 getUserProfile called");

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        // -----------------------------------
        // 2. Get user profile
        // -----------------------------------
        const user = await User.findById(userId)
            .select(
                "name email qualification role isVerified createdCourses"
            )
            .populate({
                path: "createdCourses",
                select:
                    "name description category skills language " +
                    "authorName youtubePlaylistId videos " +
                    "isPaid price totalEnrolled createdAt"
            })
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // -----------------------------------
        // 3. Get user's enrollments
        // -----------------------------------
        const enrollments = await Enrollment.find({
            user: userId
        })
            .sort({ enrollmentDate: -1 })
            .populate({
                path: "course",
                select:
                    "name description category skills language " +
                    "authorName youtubePlaylistId videos " +
                    "isPaid price totalEnrolled createdAt"
            })
            .lean();

        // -----------------------------------
        // 4. Format enrolled courses
        // -----------------------------------
        const enrolledCourses = enrollments
            .filter((enrollment) => enrollment.course)
            .map((enrollment) => ({
                ...enrollment.course,

                status: enrollment.status,

                enrollmentDate: enrollment.enrollmentDate,

                rating: enrollment.rating || null
            }));

        // -----------------------------------
        // 5. Remove internal fields
        // -----------------------------------
        delete user.createdCourses;

        // -----------------------------------
        // 6. Return profile
        // -----------------------------------
        return res.status(200).json({
            success: true,

            user: {
                ...user,

                enrolledCourses,

                createdCourses:
                    user.createdCourses || []
            }
        });

    } catch (error) {
        console.error("Get user profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user profile."
        });
    }
}

module.exports = {
    getUserProfile
};
