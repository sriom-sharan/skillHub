const Card = ({image,title,category,authorName,numOfEnrollment,rating,numOfVideos}) =>{
    return(
        <div className="flex flex-col gap-2 py-2 dark:bg-black bg-white rounded-xl border-[1px] border-gray-200 shadow-md dark:border-gray-700 md:w-64 w-72 px-2">
            <div className="flex justify-center items-center ">
                <img src="https://i.ytimg.com/vi/vhq9VhN4x8Y/maxresdefault.jpg " className="rounded-lg" />
            </div>

            <div className="">
                <div className="flex justify-between text-[10px] pb-4 poppins-light  px-1 pt-2">
                    <span className="bg-purple-200 poppins-regular px-1 rounded-sm dark:bg-purple-100 text-zinc-600  py-[2px]">* { category||'Web Development'}</span>
                    <span className="bg-purple-500 px-1 rounded-sm text-white py-[2px]">⭐ 4.3</span>
                </div>
                <h1 className="poppins-semibold text-sm md:text-base pr-4  line-clamp-1"> {title|| 'Learn Web Development'}</h1>                
                <div className="flex gap-6 text-[10px] pb-2 poppins-light  px-1 pt-3">
                    <span className="  ">{numOfVideos||'25'} lectures</span>
                    <span className="">186 students</span>
                </div>
                
                <hr />
                <div className="flex justify-between text-[10px] pb-2 poppins-light  px-1 pt-3">
                    <span className=" text-green-600 poppins-bold ">Free</span>
                    <span className="">{authorName||'JJ. Morgan'}</span>
                </div>
             </div>
        </div>
    )
}

export default Card;