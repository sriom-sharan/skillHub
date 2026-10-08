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
import Testimonials from "@/components/testimonials";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("./courses/popular");
      console.log(data);
      setCourses(data?.courses);
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
    <div className="scroll-smooth">
      <section className=" h-full sm:px-6 px-4  md:px-10 lg:px-14 xl:px-24  w-full">
        <Header />
        <Hero />
      </section>

      {/* Companies Logo */}
      <div className="main-gradient w-full flex gap-4 sm:gap-10 md:px-10 lg:px-20 xl:px-32 lg:gap-14 justify-between py-4 items-center ">
        <CompanyLogo />
      </div>

      {/* Benefits */}
      <div className="flex bg-background sm:px-6 px-4 md:px-10 lg:px-14 flex-col lg:flex-row   xl:px-44 py-20  gap-10">
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


{/* Popular Courses */}
<section className="bg-background border px-4 py-20 sm:px-6 md:px-10 lg:px-14 xl:px-24">
  <div className="mx-auto flex max-w-7xl flex-col gap-10">
    
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 text-center">
      <h2 className="poppins-semibold text-3xl text-foreground md:text-4xl">
        <span className="text-purple-500">Popular</span> Courses
      </h2>

      <p className="text-sm leading-6 text-muted-foreground">
        Discover the courses learners are engaging with the most.
        Start learning with carefully selected resources from SkillHub.
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center py-10">
        <p className="text-sm text-muted-foreground">
          Loading popular courses...
        </p>
      </div>
    ) : courses?.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {courses.map((course) => (
          <Card
            key={course.courseId}
            course={course}
          />
        ))}
      </div>
    ) : (
      <div className="py-10 text-center">
        <p className="text-sm text-muted-foreground">
          No popular courses available yet.
        </p>
      </div>
    )}
  </div>
</section>


      {/* Footer */}
      <Testimonials/>
      <Footer />
    </div>
  );
}

export default Home;
