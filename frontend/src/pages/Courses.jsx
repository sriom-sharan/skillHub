import Header from "../components/header";
import React from "react";
import Card from "@/components/card";
import Footer from "@/components/footer";

const Courses = () => {
  const categories = [
    "Web Development",
    "Designing",
    "Mobile App Development",
    "Data Structures and Algorithms",
    "Data Analytics",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Internet of Things",
    "Game Development",
    "DevOps",
    "Software Testing",
    "Database Management",
    "Networking",
    "Programming Languages",
    "IT & Software",
    "Digital Marketing",
    "Project Management",
    "Business",
    "Finance",
    "Personal Development",
    "Health & Fitness",
  ];

  // Define state with initial value
  const [activeTab, setActiveTab] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Handle tab click
  const onTabClick = (category) => {
    setActiveTab(category);
    console.log("Selected category:", category);
  };

  // Handle search input change
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const onSearchClick = () => {
    console.log("Search term:", searchTerm);
    // Add search functionality here
  };

  return (
    <>
      <Header />
      <h1 className="poppins-regular md:text-6xl sm:text-5xl sm:w-[75%] text-5xl w-[95%] leading-[1.25] text-center md:w-[40rem] mx-auto mt-32">
        Discover the top courses & playlists
      </h1>
      <p className="text-sm md:w-[40rem] w-[90%]   mb-12 mt-6 mx-auto text-center">
        Explore a transformative approach to skill development on our online
        learning platform. Uncover a new realm of learning experiences and
        elevate your expertise in unique ways.
      </p>
      <div className=" md:px-10 lg:px-14 xl:px-24 ">
        {/* Search */}
        <div className="mx-auto flex  justify-center mt-10">
          <input
            placeholder="Search 10k+ courses.."
            type="text"
            className={`border-[1px] border-r-0 px-4 py-4 md:w-[28rem] w-[20rem] sm:w-[24rem] shadow-purple-500/80 shadow-sm rounded-l-full`}
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button
            className="border-[1px] px-4 rounded-r-full shadow-purple-500/80  shadow-sm text-white py-1"
            onClick={onSearchClick}
          >
            <img
              className="w-9 p-1  dark:contrast-0 bg-transparent"
              src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000"
            />
          </button>
          {/* Show search Results */}
          {/* <div className='absolute p-2 w-96 h-96 overflow-y-auto top-36 border-2 '>
                Search Results
            </div> */}
        </div>

        {/* Categories */}
        <div className="sm:px-6 px-4  py-10">
          <div className="flex flex-wrap pb-6 gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`border-[1px] px-3 py-2 text-start rounded-full ${
                  activeTab === category
                    ? "bg-purple-500 text-white "
                    : "bg-white text-black dark:bg-black dark:text-white/70 "
                }`}
                onClick={() => onTabClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses  */}

        <div className="flex md:gap-10 gap-4 flex-wrap justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
