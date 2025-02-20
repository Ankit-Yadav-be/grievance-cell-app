import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SidebarPage from "./pages/Complaint";
import TeacherSignUp from "./pages/TeacherSignUp";
import Fs from "./pages/Fs";
import FsLogin from "./pages/FsLogin";
import TeacherLogin from "./pages/TeacherLogin";
import SidebarPageForTeacher from "./pages/SideBarPageForTeacher";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ServicesPage from "./pages/ServicePage";
import ContactPage from "./pages/Contact";
import { useAuth } from "./contextapi/authContext";
import { useTeacher } from "./contextapi/teacherContext";
import HeaderForAdmin from "./component/HeaderForAdmin";
import HeaderForStudent from "./component/HeaderForStudent";
import HeaderForTeacher from "./component/HeaderForTeachers";
import MainHeader from "./component/MainHeader";

function App() {
  const [auth] = useAuth();
  const [faculty] = useTeacher();

  return (
    <>
      <BrowserRouter>
        {auth ? (
          <HeaderForStudent />
        ) : faculty ? (
          faculty.teacher && faculty.teacher.admin ? (
            <HeaderForAdmin />
          ) : (
            <HeaderForTeacher />
          )
        ) : (
          <MainHeader />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/fs" element={<Fs />} />
          <Route path="/fslogin" element={<FsLogin />} />
          <Route path="/complaint" element={<SidebarPage />} />
          <Route path="/teacher" element={<SidebarPageForTeacher />} />
          <Route path="/teachersignup" element={<TeacherSignUp />} />
          <Route path="/teacherlogin" element={<TeacherLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
