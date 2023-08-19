import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Services from "./Components/Pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userdashboard from "./Components/Pages/user-routes/Userdashboard";
import Privateroute from "./Components/Pages/Privateroute";
import ProfileInfo from "./Components/Pages/user-routes/profileInfo";
import Feed from "./Components/Pages/Feed";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="services" element={<Services />} />
        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info" element={<ProfileInfo/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
