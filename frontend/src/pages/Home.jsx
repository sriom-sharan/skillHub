import Header from "@/components/header";
import Hero from "@/components/hero";

import BenefitCard from "@/components/partials/benefitCards";
import collage from "../assets/collage.png";
import video from "../assets/video.mp4";
import graduationIcon from "../assets/graduation.mp4";
import teacher from "../assets/teacher.mp4";
import online from "../assets/online-course.mp4";
import axios from "../utils/axios";

import { useState, useEffect } from "react";
import { getCourses } from "@/utils/getLists";
import CompanyLogo from "@/components/partials/companyLogo";
import Card from "@/components/card";
import Footer from "@/components/footer";

function Home() {
  const [courses, setCourses] = useState("");
  const [loading, setLoading] = useState(false);

  const getPopularCourses = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('./courses/popular');
      console.log(data)
      setCourses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPopularCourses();
    // const data = getCourses('https://skillhub-8nsp.onrender.com/courses');
    // console.log(data);
    // setCourses(data)
  }, []);

  return (
    <>
      <section className=" h-full sm:px-6 px-4  md:px-10 lg:px-14 xl:px-24  w-full">
        <Header />
        <Hero />
      </section>

      {/* Companies Logo */}
      <div className="main-gradient w-full flex gap-4 sm:gap-10 md:px-10 lg:px-20 xl:px-32 lg:gap-14 justify-between py-4 items-center ">
        <CompanyLogo />
      </div>

      {/* Benefits */}
      <div className="flex sm:px-6 px-4 md:px-10 lg:px-14 flex-col lg:flex-row   xl:px-44 py-20  gap-10">
        <div className="flex-1 flex items-center justify-center lg:justify-normal ">
          <img
            src={collage}
            className=" w-80 md:w-96 rounded-[70px]  outline-dashed outline-offset-8 outline-purple-500"
          />
        </div>
        <div className="flex-1 ">
          <h2 className="text-2xl sm:text-4xl poppins-semibold pb-4 text-center md:text-left">
            {" "}
            <span className="main-font-color">Benefits</span> From Our Online
            Learning
          </h2>
          <div className="flex flex-col gap-1 justify-center md:justify-normal md:px-14 lg:px-2">
            <BenefitCard
              video={graduationIcon}
              title={"Online Degrees"}
              description={
                "Earn accredicted degrees from the comfort of your home, opening doors to a of world of possibilities."
              }
            />
            <BenefitCard
              video={online}
              title={"Short Courses"}
              description={
                "Enhance your skills with our concise and focused short courses, designed for quick and effective learning."
              }
            />
            <BenefitCard
              video={teacher}
              title={"Training from Experts"}
              description={
                "Earn accredicted degrees from the comfort of your home, opening doors to a of world of possibilities."
              }
            />
            <BenefitCard
              video={video}
              title={"10k+ Video Courses "}
              description={
                "Dive into a vast library of over 1.5k video courses covering many subjects, offering a visual learning experience."
              }
            />
          </div>
        </div>
      </div>

      {/* Popular Course Category */}
      <div className=" sm:px-6 px-4 md:px-10 lg:px-14 main-gradient flex flex-col xl:px-24 py-20  gap-10">
        <div className="flex flex-col md:w-1/2 w-full mx-auto gap-2">
          <h1 className="text-white poppins-medium text-3xl md:text-4xl pb-2 text-center">
            Our Popular Courses
          </h1>
          <p className="text-white text-center poppins-regular text-sm">
            {" "}
            Discover our most sought-after courses, carefully curated to meet
            the demands of today's learners. Dive into engaging content crafted
            for success in every step of your educational journey.
          </p>
        </div>
        <div className="flex md:gap-10 gap-4 flex-wrap justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
