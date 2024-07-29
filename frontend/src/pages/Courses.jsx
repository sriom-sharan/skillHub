import Header from '../components/header';
import React from 'react';

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
  const [searchTerm, setSearchTerm] = React.useState('');

  // Handle tab click
  const onTabClick = (category) => {
    setActiveTab(category);
    console.log('Selected category:', category);
  };

  // Handle search input change
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const onSearchClick = () => {
    console.log('Search term:', searchTerm);
    // Add search functionality here
  };

  return (
    <>
      <Header />
      <div className="mt-24">
        <div className='mx-auto flex justify-center'>
          <input
            placeholder='Search'
            type='text'
            className='border-2 px-2 py-1 w-72 border-zinc-400 rounded-sm'
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button
            className='border-[1px] px-2 main-gradient rounded-sm text-white py-1'
            onClick={onSearchClick}
          >
            🔍 Search
          </button>
            {/* Show search Results */}
            {/* <div className='absolute p-2 w-96 h-96 overflow-y-auto top-36 border-2 '>
                Search Results
            </div> */}
        </div>

        <div className='sm:px-6 px-4 md:px-10 lg:px-14 xl:px-44 py-10'>
            
            <h2 className='text-2xl poppins-semibold text-center py-2 '>Select Category</h2>

            <hr className='pb-6'/>
          <div className='flex gap-2 flex-wrap pb-6 justify-center'>
            {categories.map(category => (
              <button
                key={category}
                className={`border-2 px-3 py-1 rounded-sm ${activeTab === category ? 'bg-purple-500 text-white' : 'bg-white text-black'}`}
                onClick={() => onTabClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <hr />
        </div>
      </div>
    </>
  );
};

export default Courses;
