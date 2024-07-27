
const BenefitCard = ({video,title,description}) =>{
    return(
        <div className="flex gap-6 py-2 rounded-xl border-[1px] px-2">
            <div className="flex justify-center items-center w-24 md:w-32">
            <video width="100" height="100" loop  autoPlay >
               <source src={video} type="video/mp4"/>
            </video>
            </div>

            <div className="my-auto">
                <h1 className="poppins-semibold text-sm md:text-base">{title}</h1>
                <p className=" poppins-regular text-xs md:text-sm text-slate-500">{description}</p>
                </div>
        </div>
    )
}

export default BenefitCard;