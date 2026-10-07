import axios from "../utils/axios";
import { loadcourse, removecourse } from "./courseSlice";

export { removecourse };

export const asyncloadcourse = (id) => async (dispatch) => {
  try {
    console.log("Fetching course:", id);

    const { data } = await axios.get(`courses/course-detail/${id}`);

    console.log("Course API response:", data);

    const course = data?.course;

    if (!course) {
      console.error("Course data not found in API response.");
      return;
    }

    const lectures = Array.isArray(course.videos) ? course.videos : [];

    const firstVideo = lectures[0];

    const thumbnail =
      firstVideo?.thumbnails?.maxres?.url ||
      firstVideo?.thumbnails?.high?.url ||
      firstVideo?.thumbnails?.medium?.url ||
      firstVideo?.thumbnails?.default?.url ||
      "";

    const allDetails = {
      id: course._id,

      name: course.name,
      description: course.description,
      category: course.category,

      author: course.author,
      authorName: course.authorName,

      skills: course.skills,

      enrolledUsers: course.enrolledUsers || [],

      thumbnail,

      youtubePlaylistId: course.youtubePlaylistId,

      instructorName:
        firstVideo?.videoOwnerChannelTitle || course.authorName || "SkillHub",

      lectures,

      language: course.language,
      prerequisite: course.prerequisite,

      isPaid: course.isPaid,
      price: course.price,

      totalEnrolled: course.totalEnrolled,

      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };

    dispatch(loadcourse(allDetails));

    console.table(allDetails);
  } catch (error) {
    console.error(
      "Failed to load course:",
      error.response?.data || error.message,
    );
  }
};
