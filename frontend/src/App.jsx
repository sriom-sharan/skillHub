import Header from "./components/header";
import Hero from "./components/hero";
import google from './assets/googleLogo.png'
import fedx from './assets/fedexLogo.png'
import microsoft from './assets/microsoftLogo.png'
import yt from './assets/youtubeLogo.png'
import ibm from './assets/ibmLogopng.png'
import { useState,useEffect } from "react";
import { getCourses } from "./utils/getLists";

function App() {

  const [courses,setCourses] = useState('')


  useEffect(()=>{
  const data = getCourses('https://skillhub-8nsp.onrender.com/courses');
  console.log(data);
  setCourses(data)
  },[])

  return (
    <>
      <section className=" h-full sm:px-6 px-4 md:px-10 lg:px-14 xl:px-24  bg-[#FAF5FC] w-full">
        <Header />
        <Hero />
      </section>
      <div className="main-gradient w-full flex gap-14 justify-center py-4 items-center ">
          <img src={yt} className="w-40 object-contain filter brightness-0 contrast-200 invert "/>
          {/* <img src={aws} className="w-40 object-contain filter brightness-0 contrast-200 invert"/> */}
          <img src={microsoft} className="w-40 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={google} className="w-40 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={fedx} className="w-40 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={ibm} className="w-40 object-contain filter brightness-0 contrast-200 invert"/>
      </div>
      {courses}
    </>
  );
}

export default App;
