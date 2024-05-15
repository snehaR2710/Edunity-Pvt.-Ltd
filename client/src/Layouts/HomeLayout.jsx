import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

export default function HomeLayout({ children }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // for checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying the options according to role
  const role = useSelector((state) => state?.auth?.role);

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  // function to hide the drawer on close button click
  function hidedrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    // function to hide the drawer on close button click
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  }

  const handleLogOut = async (e) => {
    e.preventDefault();

    const result = await dispatch(logout());
    console.log("logout", result);

    if (result?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[90vh]">
      {/* adding the daisy ui drawer */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input type="checkbox" className="drawer-toggle" id="my-drawer" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              {/* close button for drawer */}
              <button onClick={hidedrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li className="hover:text-yellow-500">
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li className="hover:text-yellow-500">
                <Link to={"/admin/dashboard"}>Admin DashBoard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li className="hover:text-yellow-500">
                <Link to={"/course/create"}>Create new course</Link>
              </li>
            )}

            <li className="hover:text-yellow-500">
              <Link to="/courses">All Courses</Link>
            </li>

            <li className="hover:text-yellow-500">
              <Link to="/contact">Contact Us</Link>
            </li>

            <li className="hover:text-yellow-500">
              <Link to="/about">About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute  bottom-0 w-[90%]">
                <div className="w-full flex items-center justify-center gap-2">
                  <button className="btn btn-primary px-9 py-1 font-semibold rounded-md w-fit hover:scale-105">
                    <Link to={"/login"}>Login</Link>
                  </button>

                  <button className="btn btn-secondary px-9 py-1 font-semibold rounded-md w-fit hover:scale-105">
                    <Link to={"/signup"}>Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute  bottom-0 w-[90%]">
                <div className="w-full flex items-center justify-center gap-2">
                  <button className="btn btn-primary px-9 py-1 font-semibold rounded-md w-fit hover:scale-105">
                    <Link to={"/user/profile"}>Profile</Link>
                  </button>

                  <button className="btn btn-secondary px-9 py-1 font-semibold rounded-md w-fit hover:scale-105">
                    <Link onClick={handleLogOut}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}
