const express = require("express");
const router = express.Router();

const { askAI } = require("../controllers/aiController.js");

// Add your existing authentication middleware here
// before enabling this route for students.
router.post("/chat", askAI);

module.exports = router;