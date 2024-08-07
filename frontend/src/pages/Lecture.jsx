import React from 'react';
import { useParams, useLocation, Link,useNavigate } from 'react-router-dom';

const Lecture = () => {
    const { videoId } = useParams();
    const location = useLocation();
    console.log(location);
    
    const { state } = location;
    
    console.log(videoId);
    console.log(state);

    // Destructure state properties
    const title = state?.title || 'No title available';
    const description = state?.description || 'No description available';
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };


    return (
        <div className='w-screen z-50 fixed top-0 h-screen px-3 flex flex-col bg-black'>
                 <button
            onClick={handleBackClick}
            className="text-start p-2 mt-4 md:m-4 w-24 rounded-full opacity-100 z-50 text-white border-b-2 bg-black"
        >
            🔙 Back
        </button>
        <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                className="w-full h-52 sm:h-[400px] md:h-[500px] xl:h-[600px] mx-auto my-auto max-w-[1200px] aspect-video"
            ></iframe>
            {/* <h1>{title}</h1>
            <p className='text-gray-400 w-2/3 border-b-2 py-2 mb-4 poppins-medium text-pretty text-2xl mx-auto text-center'>{title}</p>

            <p className='text-gray-400 w-2/3 text-pretty text-sm poppins-light mx-auto '>{description}</p> */}
        </div>
    );
};

export default Lecture;
