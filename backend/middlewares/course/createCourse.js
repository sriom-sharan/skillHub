const { Course, User, Enrollment } = require("../../db/db.js");
const zod = require("zod");
const { getPlaylistDetail } = require("./getPlaylistDetail.js");

const courseSchema = zod.object({
  name: zod.string().min(3).max(60),
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
  skills: zod.string(),
  language:zod.enum(["English","Hindi","Hinglish"]),
  prerequisite:zod.string().optional()
});

async function createCourse(req, res) {
  const body = req.body;
  const { _id } = req.user;
  const response = courseSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({ msg: "Invalid input credentials" });
  }
  const { name, description, category, skills, youtubePlaylistId,language,prerequisite } = body;

  try {
    const playlistId = await Course.findOne({ youtubePlaylistId });
    if (playlistId) {
      return res.status(400).json({ msg: "Playlist_Id already exist" });
    }
    const videoDetails = await getPlaylistDetail(youtubePlaylistId);
    if(!videoDetails) return res.status(400).json({msg:"Playlist Not Found"})
    const videos = videoDetails.map((data) => data.snippet);
    const course = await Course.create({
      name,
      description,
      category,
      skills,
      authorName:req.user.name,
      author: _id,
      youtubePlaylistId,
      videos,
      language,
      prerequisite
    });
    await User.findOneAndUpdate(_id, { $push: { createdCourses: course._id } });
    const enroll = await Enrollment.create({
      course: course._id,
      status: "created",
      user: _id,
    });
    return res.json({ msg: "Course Created Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}

module.exports = { createCourse };
