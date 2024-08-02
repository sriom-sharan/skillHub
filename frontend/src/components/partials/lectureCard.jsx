
const LectureCard = ({video,image,title,description,index}) =>{
    return(
        <div className="flex gap-3  py-2 rounded-xl border-[1px] px-2">
                <img className="w-10 h-10" src={image}/>
                <h1 className="poppins-regular line-clamp-1 my-auto  text-sm md:text-sm"><span className="poppins-medium">{++index}</span>. {title}</h1>
                {/* <p className=" poppins-regular line-clamp-2 text-xs md:text-sm text-slate-500">{description}</p> */}
        </div>
    )
}

export default LectureCard;