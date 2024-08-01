import Home from "./pages/Home";
import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Courses from "./pages/Courses";
import { AuthContext } from "./components/authContext";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/create-course";

function App() {
  const [isLooggedin, setisLooggedin] = useState(false);
  return (
    <>
        {/* <Home /> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthContext.Provider value = {{isLooggedin,setisLooggedin}}>

        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/course/:courseId' element={<CourseDetail/>} />
          <Route path='/create-course' element={<CreateCourse/>} />
        </Routes>
       
          </AuthContext.Provider>
    </ThemeProvider>
    </>
  );
}

export default App;
