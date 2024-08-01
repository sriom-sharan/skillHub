export { removecourse } from "./courseSlice";
import axios from "../utils/axios";
import { loadcourse } from "./courseSlice";

export const asyncloadcourse = (id) => async (dispatch) => {
  try {
    console.log(id);
    const course = await axios.get(id);
    const courseDetail = course.data.courses
    let allDetails = {
      name:courseDetail
    };

    dispatch(loadcourse(course.data.courses));
    console.table(course.data.courses);
  } catch (error) {
    console.log(error);
  }
};