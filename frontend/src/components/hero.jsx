import img from "../assets/student4.png";

const Hero = () => {
  return (
    <div className="flex justify-between  flex-row">
      <div className="poppins-medium flex flex-col justify-center w-[45%] py-10 text-6xl">
        <h1 className="">Develope your skills in a new and unique way</h1>
        <p className="text-sm py-4 text-zinc-500">
        Explore a transformative approach to skill development on our online learning platform. Uncover a new realm of learning experiences and elevate your expertise in unique ways.</p>
        <div className="poppins-medium text-base py-8 items-center flex gap-4">
          <a  href="" className="border[1px] main-gradient p-2 px-4 rounded-sm text-white " > Enroll Now</a>
          <a href=""className=" border-[1px] border-zinc-500 p-2 px-4 rounded-sm" >Browse Courses</a>
        </div>
      </div>
      <div className="w-[50%] pl-10">
        <img src={img} className="w-[600px]" />
      </div>
    </div>
  );
};

export default Hero;
