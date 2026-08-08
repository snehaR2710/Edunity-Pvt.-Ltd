import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

export default function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  // Close drawer
  function hideDrawer() {
    const drawer = document.getElementById("my-drawer");

    if (drawer) {
      drawer.checked = false;
    }
  }

  // Logout
  const handleLogOut = async (e) => {
    e.preventDefault();

    const result = await dispatch(logout());

    if (result?.payload?.success) {
      hideDrawer();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-base-300">
      
      {/*DRAWER*/}

      <div className="drawer fixed left-0 top-0 z-50 w-fit">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* MENU BUTTON */}

        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="inline-flex cursor-pointer items-center justify-center p-3"
          >
            <FiMenu
              size={30}
              className="text-white transition-all duration-300 hover:text-yellow-500"
            />
          </label>
        </div>

        {/* DRAWER SIDE */}

        <div className="drawer-side">
          {/* Background overlay */}
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* SIDEBAR */}

          <ul
            className="
              menu
              relative
              min-h-full
              w-[75vw]
              max-w-xs
              bg-black/40
              backdrop-blur-sm
              border-r
              border-white/10
              p-4
              pt-16
              text-base-content
              shadow-2xl
              sm:w-80
            "
          >
            {/* CLOSE BUTTON */}

            <li className="absolute right-3 top-3 w-fit">
              <button
                onClick={hideDrawer}
                className="
                  btn
                  btn-ghost
                  btn-circle
                  text-gray-300
                  hover:bg-white/10
                  hover:text-yellow-500
                "
              >
                <AiFillCloseCircle size={25} />
              </button>
            </li>

            {/* HOME */}

            <li onClick={hideDrawer}>
              <Link
                to="/"
                className="
                  text-base
                  font-medium
                  text-gray-200
                  transition-colors
                  hover:bg-white/10
                  hover:text-yellow-500
                "
              >
                Home
              </Link>
            </li>

            {/* ADMIN LINKS */}

            {isLoggedIn && role === "ADMIN" && (
              <>
                <li onClick={hideDrawer}>
                  <Link
                    to="/admin/dashboard"
                    className="
                      text-base
                      font-medium
                      text-gray-200
                      hover:bg-white/10
                      hover:text-yellow-500
                    "
                  >
                    Admin Dashboard
                  </Link>
                </li>

                <li onClick={hideDrawer}>
                  <Link
                    to="/course/create"
                    className="
                      text-base
                      font-medium
                      text-gray-200
                      hover:bg-white/10
                      hover:text-yellow-500
                    "
                  >
                    Create New Course
                  </Link>
                </li>
              </>
            )}

            {/* COMMON LINKS */}

            <li onClick={hideDrawer}>
              <Link
                to="/courses"
                className="
                  text-base
                  font-medium
                  text-gray-200
                  hover:bg-white/10
                  hover:text-yellow-500
                "
              >
                All Courses
              </Link>
            </li>

            <li onClick={hideDrawer}>
              <Link
                to="/contact"
                className="
                  text-base
                  font-medium
                  text-gray-200
                  hover:bg-white/10
                  hover:text-yellow-500
                "
              >
                Contact Us
              </Link>
            </li>

            <li onClick={hideDrawer}>
              <Link
                to="/about"
                className="
                  text-base
                  font-medium
                  text-gray-200
                  hover:bg-white/10
                  hover:text-yellow-500
                "
              >
                About Us
              </Link>
            </li>

            {/* BOTTOM SECTION */}

            <div
              className="
                absolute
                bottom-5
                left-4
                right-4
                flex
                flex-col
                gap-3
              "
            >
              {/* LOGGED OUT */}

              {!isLoggedIn && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Link
                    to="/login"
                    onClick={hideDrawer}
                    className="
                      btn
                      btn-primary
                      w-full
                      text-sm
                      font-semibold
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={hideDrawer}
                    className="
                      btn
                      btn-secondary
                      w-full
                      text-sm
                      font-semibold
                    "
                  >
                    Signup
                  </Link>
                </div>
              )}

              {/* LOGGED IN */}

              {isLoggedIn && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Link
                    to="/user/profile"
                    onClick={hideDrawer}
                    className="
                      btn
                      btn-primary
                      w-full
                      text-sm
                      font-semibold
                    "
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="
                      btn
                      btn-secondary
                      w-full
                      text-sm
                      font-semibold
                    "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* PAGE CONTENT */}

      <main className="min-h-[calc(100vh-80px)] w-full">
        {children}
      </main>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}