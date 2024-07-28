import Home from "./pages/Home";
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

function App() {

  return (
    <>
        {/* <Home /> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/courses' element={<Courses/>} />
        </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
