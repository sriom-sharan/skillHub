const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    qualification: { type: String },
    validationCode: { type: Number, maxlength: 6, minlength: 6 },
    validationCodeCreatedAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["student", "mentor"],
      // required: true,
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);




// Course Schema
const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    skills: { type: [String], default: [] },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Enrollment Schema
const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["enrolled", "completed", "dropped"],
      default: "enrolled",
    },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Models
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = { User, Course, Enrollment };
