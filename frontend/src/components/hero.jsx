import img from "../assets/student4.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row mt-24 justify-between items-center">
      <div className="poppins-medium flex flex-col justify-center w-full md:w-[45%] py-10 px-4 md:px-0 ">
        <h1 className="sm:text-4xl text-3xl lg:text-6xl">Develop your skills in a new and unique way</h1>
        <p className="text-base md:text-sm py-4 text-zinc-500">
          Explore a transformative approach to skill development on our online learning platform. Uncover a new realm of learning experiences and elevate your expertise in unique ways.
        </p>
        <div className="poppins-medium text-sm md:text-base py-8 items-center flex gap-4">
          <Link to="/signup" className="border[1px] main-gradient p-2 px-4 rounded-sm text-white">
            Enroll Now
          </Link>
          <Link to="courses" className="border-[1px] border-zinc-500 p-2 px-4 rounded-sm">
            Browse Courses
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[50%] pl-0 md:pl-10 flex justify-center">
        <img src={img} className="w-96 sm:w-[500px] md:w-[800px]  xl:w-[800px]" />
      </div>
    </div>
  );
};

export default Hero;
