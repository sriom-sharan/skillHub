import logo from '../assets/logo2.png'
import { ModeToggle } from './partials/dark-light-button';
import { Link } from 'react-router-dom';
import { AuthContext } from './authContext';
import { useContext, useEffect, useState } from 'react';
import Profile from './avatar';

const Header = ({bg=''})=>{
  const {isLoggedin,} = useContext(AuthContext)
  const [isOpen,setIsOpen] = useState(false)
  const [scrolled,setScrolled] = useState(0)

  const handleScroll = () => {
    if (window.scrollY > 50) {
        setScrolled(true);
    } else {
        setScrolled(false);
    }
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

    return (
   <header className={`bg-transparent fixed z-50  ${scrolled?'bg-white dark:bg-black':'bg:transparent dark:bg-zinc-900'} px-4 md:px-8 xl:px-0   top-0 left-0   w-full `} >
  <div className="mx-auto max-w-screen-xl">
    <div className="flex h-20 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <Link className="block text-teal-600" to="/">
          <span className="sr-only">Home</span>
          {/* <img className='w-24 dark:fliter brightness-200 contrast-0' src={logo} /> */}
          <h1 className="text-2xl main-font-color  poppins-bold">
          {" "}
          <span className="dark:text-white pl-2 xl:pl-0  text-black">Skill</span>Hub </h1>
        </Link>
      </div>
      
      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex poppins-regular items-center gap-6 text-sm">
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" to="/courses"> Courses </Link>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          { !isLoggedin ? <div className="sm:flex sm:gap-2">
            <Link
              className="rounded-md  px-5 py-2.5 text-sm poppins-medium dark:text-white text-black "
              to="/login"
            >
              Login
            </Link>

            <div className="hidden sm:flex">
              <Link
              
                className="rounded-full text-white main-gradient px-6 py-2 poppins-bold text-sm "
                to='/signup'
              >
                Sign Up
              </Link>
            </div>
          </div>
        : <Profile />
      
           }
            <ModeToggle />
          

          <div className="block md:hidden pr-2 ">
            <button onClick={()=>setIsOpen((prev)=>!prev)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

     { isOpen &&  <nav aria-label="Global" className="flex flex-col absolute top-20 right-0 shadow-md pb-4 bg-white w-full z-10 md:hidden">
          <ul className="flex flex-col poppins-regular items-center gap-6 text-sm">

            <hr className='text-gray-800 w-full'/>
            <li>
              <p onClick={()=>setIsOpen((prev)=>!prev)} className="text-gray-500 cursor-pointer transition hover:text-gray-500/75" href="#"> ✖️ </p>
            </li>
            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" to="/courses"> Courses </Link>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
            </li>
          </ul>
        </nav>}



          </div>
        </div>
      </div>
    </div>
  </div>
</header>

    )
}

export default Header;