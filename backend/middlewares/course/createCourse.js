const { Course,User } = require("../../db/db.js");
const zod = require("zod");
const { getPlaylistDetail } = require("./getPlaylistDetail.js");

const courseSchema = zod.object({
  name: zod.string().min(3).max(30),
  description: zod.string(),
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
    "Health & Fitness",
  ]),
  youtubePlaylistId: zod.string(),
  skills:zod.string()
});

async function createCourse(req, res) {
  const body = req.body;
  const {email} = req.user;
  const response = courseSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }
  const { name, description, category, skills, youtubePlaylistId } = body;

  try {
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const videoDetails = await getPlaylistDetail(youtubePlaylistId);
    const videos = videoDetails.map((data) => data.snippet);
    const course = await Course.create({
      name,
      description,
      category,
      skills,
      author:userDetail._id,
      youtubePlaylistId,
      videos,
    });
    return res.json({ msg: "Course Created Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}

module.exports = {createCourse}