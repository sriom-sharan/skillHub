import React, { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import Header from "@/components/header";
import { useSelector, useDispatch } from 'react-redux'
import {courseSlice} from '../store/courseSlice'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import  axios  from "../utils/axios";
import { asyncloadcourse,removecourse } from "../store/courseAction";
import BenefitCard from "@/components/partials/benefitCards";
import LectureCard from "@/components/partials/lectureCard";

const CourseDetail = () => {


  const { courseId } = useParams();
  // const [course, setcourse] = useState({})
  console.log(courseId);


  const course = useSelector((state) => state.course.info)
  const dispatch = useDispatch();

  console.log("this is course",course);
  useEffect(() => {
    dispatch(asyncloadcourse(courseId));
    // console.log("this is ingo",info);
    
    // setcourse(info.course.info.course)
    return () => {
      dispatch(removecourse());
    };
  }, [dispatch,courseId]);

  // async function getCourse(id) {
  //   try {
  //     const { data } = await axios.get(`courses/course-detail/${id}`);
  //     console.log(data);
  //     setcourse(data.course); // Assuming 'data.course' contains the course data
  //   } catch (error) {
  //     console.error("Error fetching course:", error);
  //   }
  // }

  // useEffect(() => {
  //   if (courseId) {
  //     getCourse(courseId);
  //   }
  // }, [courseId]);
  // console.log(course.videos[0].thumbnails.standard.ur);
  
  return (
    <>
      <Header />
      <Breadcrumb className="mt-32 mb-12  md:px-10 lg:px-14 xl:px-24 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/courses">All Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Course Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-4 poppins-regular flex-col md:flex-row mt-6 md:px-10 lg:px-14 xl:px-24 ">
      {  course && <div className=" w-[70%]">
            <img className=" shadow-2xl rounded-lg shadow-accent" src={course.thumbnail}/>
            <div className="flex flex-col py-4">
          <h1 className="poppins-bold md:text-2xl sm:text-3xl text-4xl   leading-[1.25]">
            {course.name}

          </h1>
        <p className="dark:text-zinc-400 text-sm text-black/70">Course By <span className="text-black poppins-semibold">{course.authorName}</span> </p>
            </div>
        <p className="dark:text-zinc-400 text-sm text-black/70">{course.description}</p>
        </div>}
       
      {  course && <div className="border-[1px] w-[30%] p-4">
        <div className="pb-4">

        <h4 className="pb-2 poppins-semibold">About the Course</h4>
        {/* <div className="flex">
        <img className="w-10 rounded-full h-10" src=""/>
        <p className=" text-sm poppins-medium">{course.instructorName}</p>
        </div> */}
          </div>
        

        <p className="dark:text-zinc-400 text-sm pb-4  text-justify text-black/70">{course.description}</p>

        <div className="flex-col justify-start ">
        {
          course.lectures.map((data,i)=>{
            return <Link to={`/`}><LectureCard title={data.title} index={i} image={data.thumbnails.default.url} description={data.description} /></Link>
          })
        }
        </div>

        </div>}

      </div>
    </>
  );
};

export default CourseDetail;
