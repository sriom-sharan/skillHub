import Home from "./pages/Home";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Courses from "./pages/Courses";
import { AuthContext } from "./components/authContext";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/create-course";
import Error from "./pages/Error";
import UserProfile from "./pages/UserProfile";
import WatchLecture from "./pages/WatchLecture";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  // Check localStorage for authentication state on initial load
  // useEffect(() => {
  //   const storedLoginState = localStorage.getItem('isLoggedin');
  //   if (storedLoginState) {
  //     setIsLoggedin(JSON.parse(storedLoginState));
  //   }
  // }, []);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedin');
    console.log("Initial localStorage value:", storedLoginState);
  
    try {
      const parsedLoginState = JSON.parse(storedLoginState);
      if (typeof parsedLoginState === 'boolean') {
        setIsLoggedin(parsedLoginState);
      } else {
        console.error("Invalid boolean value in localStorage");
      }
    } catch (e) {
      console.error("Failed to parse localStorage value:", e);
    }
  }, []);
  

  // Update localStorage when authentication state changes

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContext.Provider value={{ isLoggedin, setIsLoggedin }}>
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path="/courses/:courseId" element={<CourseDetail />}>
              <Route path="lectures/:videoId" element={<WatchLecture />} />
            </Route>
          <Route path='/create-course' element={isLoggedin? <CreateCourse />:<Login/>} />
          {/* <Route path='/*' element={<Error />} /> */}
        </Routes>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
