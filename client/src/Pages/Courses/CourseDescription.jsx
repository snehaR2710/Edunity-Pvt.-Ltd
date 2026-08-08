import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

export function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-full px-4 py-10 text-white sm:px-6 md:px-10 lg:px-16">

        <div
          className="
            mx-auto
            grid
            w-full
            max-w-6xl
            grid-cols-1
            gap-8
            rounded-lg
            py-6
            md:gap-10
            lg:grid-cols-2
            lg:py-10
          "
        >

          {/* ================= LEFT SECTION ================= */}

          <div className="w-full space-y-5">

            {/* Course Thumbnail */}
            <div className="w-full overflow-hidden rounded-lg">
              <img
                className="
                  h-52
                  w-full
                  object-cover
                  sm:h-64
                  md:h-72
                  lg:h-80
                "
                src={state?.thumbnail?.secure_url}
                alt={state?.title || "Course thumbnail"}
              />
            </div>

            {/* Course Information */}
            <div className="space-y-4">

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  text-center
                  text-base
                  sm:text-lg
                  md:flex-row
                  md:items-center
                  md:justify-between
                  md:text-left
                "
              >
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Total lectures:
                  </span>{" "}
                  {state?.numberOfLectures || 0}
                </p>

                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Instructor:
                  </span>{" "}
                  {state?.createdBy}
                </p>
              </div>

              {/* Action Button */}

              {role === "ADMIN" ||
              data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylecture", {
                      state: { ...state },
                    })
                  }
                  className="
                    w-full
                    rounded-md
                    bg-yellow-600
                    px-5
                    py-3
                    text-lg
                    font-bold
                    transition-all
                    duration-300
                    hover:bg-yellow-500
                    sm:text-xl
                  "
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="
                    w-full
                    rounded-md
                    bg-yellow-600
                    px-5
                    py-3
                    text-lg
                    font-bold
                    transition-all
                    duration-300
                    hover:bg-yellow-500
                    sm:text-xl
                  "
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          {/* ================= RIGHT SECTION ================= */}

          <div className="w-full space-y-4 text-base leading-7 sm:text-lg md:text-xl">

            <h1
              className="
                text-center
                text-2xl
                font-bold
                text-yellow-500
                sm:text-3xl
                lg:text-left
              "
            >
              {state?.title}
            </h1>

            <div>
              <p className="mb-2 font-semibold text-yellow-500">
                Course Description:
              </p>

              <p className="break-words text-gray-200">
                {state?.description}
              </p>
            </div>

          </div>

        </div>
      </div>
    </HomeLayout>
  );
}