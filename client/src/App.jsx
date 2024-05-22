import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import { AboutUs } from "./Pages/AboutUs";
import { ContactUs } from "./Pages/ContactUs";
import { CourseDescription } from "./Pages/Courses/CourseDescription";
import { CourseLists } from "./Pages/Courses/CourseList";
import CreateCourse from "./Pages/Courses/CreateCourse";
import { DisplayLectures } from "./Pages/Dashboard/DisplayLectures";
import { Denied } from "./Pages/Denied";
import { HomePage } from "./Pages/HomePage";
import { Login } from "./Pages/Login";
import { NotFoundPage } from "./Pages/NotFoundpage";
import Chechout from "./Pages/Payment/Chechout";
import { CheckoutFail } from "./Pages/Payment/CheckoutFail";
import { CheckoutSuccess } from "./Pages/Payment/CheckoutSuccess";
import { Signup } from "./Pages/Signup";
import { ChangePassword } from "./Pages/User/ChangePassword123";
import EditProfile from "./Pages/User/EditProfile";
import { ForgotPassword } from "./Pages/User/ForgotPassword";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/about" element={<AboutUs />}></Route>

        <Route path="/contact" element={<ContactUs />}></Route>

        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/courses" element={<CourseLists />}></Route>

        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route element={<RequireAuth allowedRoles={"ADMIN"} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/edit-profile" element={<EditProfile />}></Route>
          <Route path="/checkout" element={<Chechout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
          <Route path="/checkout/fail" element={<CheckoutFail />}></Route>
          <Route
            path="/course/displaylecture"
            element={<DisplayLectures />}
          ></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>

          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Route>

        <Route path="/denied" element={<Denied />}></Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
