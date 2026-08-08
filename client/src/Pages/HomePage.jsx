import { Link } from "react-router-dom";

import HomePageImage from "../Assets/images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

export function HomePage() {
  return (
    <HomeLayout>
      <section
        className="
          flex
          min-h-[calc(100vh-80px)]
          w-full
          flex-col
          items-center
          justify-center
          gap-10
          px-5
          pb-10
          pt-16
          text-white
          sm:px-8
          md:flex-row
          md:gap-12
          md:px-12
          lg:px-20
          lg:pt-10
        "
      >

        {/* ================= LEFT CONTENT ================= */}

        <div
          className="
            flex
            w-full
            flex-col
            items-center
            space-y-5
            text-center
            md:w-1/2
            md:items-start
            md:text-left
            lg:space-y-6
          "
        >
          <h1
            className="
              max-w-xl
              text-3xl
              font-semibold
              leading-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            Find out best{" "}
            <span className="font-bold text-yellow-500">
              Online Courses
            </span>
          </h1>

          <p
            className="
              max-w-xl
              text-base
              leading-relaxed
              text-gray-200
              sm:text-lg
              lg:text-xl
            "
          >
            We have a large library of courses taught by
            highly skilled and qualified faculties at a very
            affordable cost.
          </p>

          <div
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-3
              sm:w-auto
              sm:flex-row
              sm:gap-5
              md:justify-start
            "
          >
            <Link
              to="/courses"
              className="
                w-full
                sm:w-auto
              "
            >
              <button
                className="
                  w-full
                  rounded-md
                  bg-yellow-500
                  px-6
                  py-3
                  text-base
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:bg-yellow-600
                  sm:text-lg
                "
              >
                Explore Courses
              </button>
            </Link>

            <Link
              to="/contact"
              className="
                w-full
                sm:w-auto
              "
            >
              <button
                className="
                  w-full
                  rounded-md
                  border
                  border-yellow-500
                  px-6
                  py-3
                  text-base
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-yellow-600
                  sm:text-lg
                "
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}

        <div
          className="
            flex
            w-full
            items-center
            justify-center
            md:w-1/2
          "
        >
          <img
            src={HomePageImage}
            alt="Online learning"
            className="
              h-auto
              w-[75%]
              max-w-[450px]
              object-contain
              sm:w-[65%]
              md:w-full
              lg:max-w-[520px]
            "
          />
        </div>

      </section>
    </HomeLayout>
  );
}