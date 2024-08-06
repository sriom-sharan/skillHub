import React from 'react';
import { useParams } from 'react-router-dom';

const WatchLecture = () => {
    const { videoId } = useParams();
    console.log(videoId);
    
    return (
        <div className='w-screen z-50  absolute top-0  h-full flex flex-col justify-center  bg-black/90'>
            <span className='text-start p-2 m-4 w-24 rounded-full opacity-100 z-50 text-white border-b-2'>🔙 Back</span>
            <iframe
                width="70%"
                height="80%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='m-auto'
            ></iframe>
        </div>
    );
}

export default WatchLecture;
