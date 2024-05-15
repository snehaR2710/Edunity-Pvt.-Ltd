import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CourseCard } from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

export function CourseLists() {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-10  pl-20 flex flex-col gap-10 text-white">
        <h1 className="font-serif text-center text-3xl font-semibold mb-5">
          Elplore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mb-5 flex flex-wrap gap-14">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
}
