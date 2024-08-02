export { removecourse } from "./courseSlice";
import axios from "../utils/axios";
import { loadcourse } from "./courseSlice";

export const asyncloadcourse = (id) => async (dispatch) => {
  try {
    console.log(id);
    const {data} = await axios.get(`courses/course-detail/${id}`);
    // Accessing course details from the nested 'course' object
    console.log(data);
    
    const course = data.course;

    // Constructing the course details object
    const allDetails = {
      id: course._id,
      name: course.name,
      description: course.description,
      category: course.category,
      author: course.author, // Added author
      authorName:course.authorName,
      skills: course.skills,
      enrolledUsers: course.enrolledUsers, // Assuming you want to keep this array
      thumbnail: course.videos[0].thumbnails.maxres.url,
      youtubePlaylistId: course.youtubePlaylistId ,// Added youtubePlaylistId
      instructorName:course.videos[0].videoOwnerChannelTitle,
      lectures:course.videos
    };
    dispatch(loadcourse(allDetails));
    console.table(allDetails);
    console.log(allDetails);
  } catch (error) {
    console.log(error);
  }
};