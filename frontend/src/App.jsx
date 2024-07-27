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

function App() {

  return (
    <>
        {/* <Home /> */}
        <Routes>
          <Route path="/" element={<Home />} />   
        </Routes>
    </>
  );
}

export default App;
