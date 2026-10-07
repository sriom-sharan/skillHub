const { User } = require("../../db/db.js");
const jwt = require("jsonwebtoken");

require("dotenv").config();

async function checkLoginMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // No Authorization header
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        // Invalid Authorization format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        // Find user
        const userDetail = await User.findOne({
            email: decoded.email
        });

        if (!userDetail) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach authenticated user
        req.user = userDetail;

        console.log("✅ Authenticated user:", userDetail.email);

        return next();

    } catch (error) {
        console.error("❌ Auth middleware error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
}

module.exports = {
    checkLoginMiddleware
};
