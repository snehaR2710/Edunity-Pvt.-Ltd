import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CourseCard } from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

export function CourseLists() {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-full px-4 py-10 text-white sm:px-6 md:px-10 lg:px-16">

        {/* Heading */}
        <h1 className="mb-10 text-center font-serif text-2xl font-semibold sm:text-3xl">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">
            Industry Experts
          </span>
        </h1>

        {/* Course Cards */}
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            grid-cols-1
            justify-items-center
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {courseData?.map((element) => (
            <CourseCard
              key={element._id}
              data={element}
            />
          ))}
        </div>

        {/* Empty State */}
        {!courseData?.length && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-center text-lg text-gray-400">
              No courses available.
            </p>
          </div>
        )}

      </div>
    </HomeLayout>
  );
}