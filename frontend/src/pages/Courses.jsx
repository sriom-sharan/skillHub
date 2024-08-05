import Header from "../components/header";
import React, { useEffect, useState, useCallback } from "react";
import Card from "@/components/card";
import Footer from "@/components/footer";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import LectureCard from "@/components/cardShimmer";
import debounce from 'lodash/debounce'; // Import debounce function from lodash
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const notify = () => toast("Sorry no courses available in this category.");
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

  const getCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('./courses');
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Define debounced search function
  const debouncedHandleSearch = useCallback(
    debounce(async (searchString) => {
      if (typeof searchString !== 'string' || searchString.trim() === '') {
        console.error('Invalid search string');
        setSearchList([])
        return;
      }
      try {
        const { data } = await axios.post('courses/search', { searchString });
        setSearchList(data.courses);
      } catch (error) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    }, 300), // Adjust debounce delay (in milliseconds) as needed
    []
  );

  // Handle search input change
  const onSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedHandleSearch(newSearchTerm);
  };

  const onTabClick = (category) => {

    if(category === activeTab){
      setActiveTab('')
      return;
    }
    setActiveTab(category);
  };

  useEffect(() => {
    if (activeTab) {
      const filteredData = courses.filter(course => course.category === activeTab);
      console.log(filteredData);
      
      setFilteredCourses(filteredData);
    } else {
      setFilteredCourses(courses); // Reset to all courses if no active tab
    }
  }, [activeTab, courses]);


  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Header />
      <h1 className="poppins-regular md:text-6xl sm:text-5xl sm:w-[75%] text-5xl w-[95%] leading-[1.25] text-center md:w-[40rem] mx-auto mt-32">
        Discover the top courses & playlists
      </h1>
      <p className="text-sm md:w-[40rem] w-[90%] mb-12 mt-6 mx-auto text-center">
        Explore a transformative approach to skill development on our online
        learning platform. Uncover a new realm of learning experiences and
        elevate your expertise in unique ways.
      </p>
      <div className="md:px-10 lg:px-14 xl:px-24 ">
        <div className="mx-auto flex justify-center mt-10">
          <input
            placeholder="Search 10k+ courses.."
            type="text"
            className={`border-[1px] border-r-0 px-4 py-4 md:w-[28rem] w-[20rem] sm:w-[24rem] shadow-purple-500/80 shadow-sm rounded-l-full`}
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button
            className="border-[1px] px-4 rounded-r-full shadow-purple-500/80 shadow-sm text-white py-1"
            onClick={() => debouncedHandleSearch(searchTerm)}
          >
            <img
              className="w-9 p-1 dark:contrast-0 bg-transparent"
              src="https://img.icons8.com/?size=100&id=59878&format=png&color=000000"
            />
          </button>
          {searchList.length>0 && (
            <div className='absolute bg-gray-200 shadow-purple-500/80 shadow-sm px-2 pt-2 w-[30rem] overflow-y-auto top-[26rem] border-2 '>
              {searchList.map((data) => (
                <Link key={data._id} to={`/courses/${data._id}`}>
                  <p className="py-2 border-b-2 border-gray-300">🔗 {data.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="sm:px-6 px-4 py-10">
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
        {filteredCourses.length>0 ? (
          <div className="flex md:gap-10 gap-4 flex-wrap justify-center">
            {  filteredCourses.map((course) => (
              <Link key={course._id} to={`/courses/${course._id}`}>
                <Card title={course.name} category={course.category} authorName={course.authorName} numOfVideos={course.videos.length} />
              </Link>
            ))}

          </div>
        ) :
          <p className="flex text-center md:gap-10 gap-4 flex-wrap justify-center text-2xl poppins-regular py-4  ">⚠️ Sorry No Course Available in this category right now.</p>
        }
    
    {loading && <LectureCard />  }
        

      </div>

      <Footer />
    </>
  );
};

export default Courses;


