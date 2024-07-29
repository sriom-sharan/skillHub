const { Course } = require("../../db/db.js");

async function searchCourses(req, res) {
    try {
        const searchString = req.body.searchString; // Ensure the search string is properly extracted from the request body

        if (!searchString || typeof searchString !== 'string') {
            return res.status(400).json({ msg: "Invalid search string" }); // Handle invalid or missing search string
        }

        const courses = await Course.find({
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { skills: { $regex: searchString, $options: 'i' } },
                { category: { $regex: searchString, $options: 'i' } },
                { description: { $regex: searchString, $options: 'i' } }
                // Add more fields as needed
            ]
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

module.exports = { searchCourses };
