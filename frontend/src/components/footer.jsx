const Footer = () => {
  return (
    <div className=" py-10  poppins-regular">
      {/* Contact Us */}
      <div className="w-[80%]  sm:w-[70%] xl:w-1/2 mx-auto  main-gradient rounded-xl  p-2 md:px-16 sm:px-4 py-8">
        <h1 className="text-center text-2xl py-2">Get in Touch!</h1>
        <p className="text-center text-sm pb-2">
          Contact Us to get your solution and enjoy discounts, promos and much
          more!
        </p>
        <div className="flex flex-col w-full gap-4 justify-center pt-4">
          <input
            placeholder="Enter Your Email..."
            type="text"
            className="= mx-auto rounded-sm p-2 md:w-[28rem] w-[20rem]"
          />
          <textarea
            maxLength={155}
            placeholder="Enter Your Query.."
            type="text"
            className="= mx-auto rounded-sm p-2 text-sm  md:w-[28rem] w-[20rem] "
          />
          <button className=" px-4 mx-auto md:w-[28rem] w-[20rem] rounded-sm  border-[1px] border-gray-100 text-white hover:bg-purple-600 py-1">
            Contact Us
          </button>
        </div>
      </div>
    
    {/* Footer Menu and Details */}
      <div></div>
    </div>
  );
};

export default Footer;
