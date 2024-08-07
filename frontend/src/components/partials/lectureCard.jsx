
const LectureCard = ({video,image,title,description,index}) =>{
    return(
        <div className="flex-col flex gap-2 w-64 sm:60 md:w-64 py-2 rounded-xl border-[1px] px-2">
                <img className="w-full" src={image}/>
                <h1 className="poppins-regular line-clamp-1 my-auto  text-sm md:text-sm"><span className="poppins-medium  bg-purple-200 p-1 rounded-full">{++index}</span>. {title}</h1>
                {/* <p className=" poppins-regular line-clamp-2 text-xs md:text-sm text-slate-500">{description}</p> */}
        </div>
    )
}

export default LectureCard;