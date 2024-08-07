import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
import Header from "@/components/header";
import { useSelector, useDispatch } from "react-redux";
import { courseSlice } from "../store/courseSlice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "../utils/axios";
import { asyncloadcourse, removecourse } from "../store/courseAction";
import BenefitCard from "@/components/partials/benefitCards";
import LectureCard from "@/components/partials/lectureCard";
import { AuthContext } from "@/components/authContext";
import Error from "./Error";
import { putData } from "@/utils/postData";
import Footer from "@/components/footer";
import CourseDShimmer from "@/components/courseDShimmer";

const CourseDetail = () => {
  const { isLoggedin } = useContext(AuthContext);
  const [show, setShow] = useState(3);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const course = useSelector((state) => state.course.info);
  const dispatch = useDispatch();

  async function enrollInCourse() {
    const response = await putData("courses/enroll", { courseId });
    console.log(response.msg);
    if (response.msg === "Enrolled in course successfully") {
      navigate("/profile");
    } else {
      setError(response.msg || "Login failed");
    }
  }

  useEffect(() => {
    dispatch(asyncloadcourse(courseId));

    return () => {
      dispatch(removecourse());
    };
  }, [dispatch, courseId]);

  return course && dispatch ? (
    <>
      <Header bg="bg-white" />
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

      <Outlet />

      <div className="flex gap-4 poppins-regular flex-col md:flex-row mt-6 md:px-10 lg:px-14 xl:px-24 ">
        {course && (
          <div className=" w-full px-2 md:w-[70%] md:px-0">
            <img
              className=" shadow-2xl rounded-lg shadow-accent"
              src={course.thumbnail}
            />
            <div className="flex flex-col py-4">
              <h1 className="poppins-bold md:text-2xl sm:text-3xl text-4xl   leading-[1.25]">
                {course.name}
              </h1>
              <p className="dark:text-zinc-400 text-sm text-black/70">
                Course By{" "}
                <span className="text-black dark:text-white poppins-semibold">
                  {course.authorName}
                </span>{" "}
              </p>
            </div>

            {/* <p className="dark:text-zinc-400 text-sm text-black/70">{course.description}</p> */}
          </div>
        )}

        {course && (
          <div className="border-[1px] w-full md:w-[30%] p-4">
            <div className="pb-2">
              <h4 className=" text-2xl poppins-semibold">About the Course</h4>
            </div>

            {/* Course Description */}
            <p className="dark:text-zinc-400 text-sm pb-4  text-justify text-black/70">
              {course.description}
            </p>
            <hr className="my-2" />

            <p className="dark:text-zinc-400  text-black/70 py-2">
              <span className="text-xl text-black">Language</span> :{" "}
              {course.language}
            </p>

            <hr className="my-2" />

            <p className="text-xl">Skills you will gain :</p>
            <ol className="list-disc pl-4 pt-2">
              {course.skills.split(",").map((data) => {
                return (
                  <li className="poppins-regular pl-2 text-sm" key={data}>
                    {data}
                  </li>
                );
              })}
            </ol>

            <div className=" justify-center flex  mt-8">
              <button
                onClick={
                  isLoggedin
                    ? enrollInCourse
                    : () => {
                        navigate("/login");
                      }
                }
                className="border[1px] main-gradient  text-center p-2 px-4 rounded-sm text-white w-96"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </div>
      <hr className="my-2 mx-24" />
      <div className="w-[100%] h-auto md:px-10 lg:px-14 xl:px-24 my-20">
        <h1 className="text-3xl text-center mt-2 poppins-regular">Lectures</h1>
        <hr className="mb-4 mt-1" />
        <div className="flex flex-wrap gap-4 justify-center  ">
          {course.lectures.slice(0, show).map((data, i) => {
            return (
              <Link
                to={{
                  pathname: `/lectures/${data.resourceId.videoId}`,
                  // state: {
                  //   title: data.title,
                  //   description: data.description,
                  // },
                }}
                key={data.resourceId.videoId}
                className="transition-all delay-1000"
              >
                {" "}
                <LectureCard
                  title={data.title}
                  index={i}
                  image={data.thumbnails.default.url}
                  description={data.description}
                />
              </Link>
            );
          })}
        </div>
        
        {show <= course.lectures.length ? (
          <button
            onClick={() => setShow((prev) => prev + 10)}
            className="border-[1px] mt-8 p-1 underline bg-purple-200 shadow-background rounded-full p w-full"
          >
            Show More..
          </button>
        ) : (
          <button
            onClick={() => setShow(3)}
            className="border-[1px] my-2 p-1 underline bg-purple-200 shadow-background rounded-full p w-full"
          >
            Collapse All
          </button>
        )}
      </div>
      <Footer />
    </>
  ) : (
    <CourseDShimmer />
  );
};

export default CourseDetail;
