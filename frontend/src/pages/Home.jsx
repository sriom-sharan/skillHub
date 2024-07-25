import Header from "@/components/header";
import Hero from "@/components/hero";

import BenefitCard from "@/components/partials/benefitCards";
import collage from '../assets/collage.png'
import video from '../assets/video.mp4'
import graduationIcon from '../assets/graduation.mp4'
import teacher from '../assets/teacher.mp4'
import online from '../assets/online-course.mp4'

import { useState,useEffect } from "react";
import { getCourses } from "@/utils/getLists";
import CompanyLogo from "@/components/partials/companyLogo";

function Home() {

  const [courses,setCourses] = useState('')


  useEffect(()=>{
  // const data = getCourses('https://skillhub-8nsp.onrender.com/courses');
  // console.log(data);
  // setCourses(data)
  },[])

  return (
    <>
      <section className=" h-full sm:px-6 px-4 md:px-10 lg:px-14 xl:px-24  bg-[#FAF5FC] w-full">
        <Header />
        <Hero />
      </section>

      {/* Companies Logo */}
      <div className="main-gradient w-full flex gap-4 sm:gap-10 lg:gap-14 justify-center py-4 items-center ">
        <CompanyLogo />
      </div>

      {/* Benefits */}
      <div className="flex sm:px-6 px-4 md:px-10 lg:px-14 flex-col md:flex-row  xl:px-24 py-20  gap-10">
        <div className="flex-1 flex items-center justify-center md:justify-normal ">
        <img src={collage} className=" w-80 md:w-96 rounded-[70px]  outline-dashed outline-offset-8 outline-purple-500"/>
        </div>
        <div className="flex-1 ">
        <h2 className="text-2xl sm:text-4xl poppins-semibold pb-4 text-center md:text-left"> <span className="main-font-color">Benefits</span> From Our Online Learning</h2>
        <div className="flex flex-col gap-1 justify-center md:justify-normal">
          <BenefitCard video={graduationIcon} title={'Online Degrees'} description={'Earn accredicted degrees from the comfort of your home, opening doors to a of world of possibilities.'} />
          <BenefitCard video={online} title={'Short Courses'} description={'Enhance your skills with our concise and focused short courses, designed for quick and effective learning.'} />
          <BenefitCard video={teacher} title={'Training from Experts'} description={'Earn accredicted degrees from the comfort of your home, opening doors to a of world of possibilities.'} />
          <BenefitCard video={video} title={'10k+ Video Courses '} description={'Earn accredicted degrees from the comfort of your home, opening doors to a of world of possibilities.'} />
        </div>
        </div>
      </div>


    </>
  );
}

export default Home;
