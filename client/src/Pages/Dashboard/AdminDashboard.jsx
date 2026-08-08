import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StateSlics";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    allUsersCount,
    enrolledUsersCount,
  } = useSelector((state) => state.state);

  const { courseData } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStatsData());
  }, [dispatch]);

  const totalLectures =
    courseData?.reduce(
      (total, course) =>
        total + (course?.numberOfLectures || 0),
      0
    ) || 0;

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "Users",
        data: [
          allUsersCount || 0,
          enrolledUsersCount || 0,
        ],
        backgroundColor: ["#eab308", "#22c55e"],
        borderColor: ["#eab308", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  const courseDataChart = {
    labels: ["Courses", "Lectures"],
    datasets: [
      {
        label: "Course Statistics",
        data: [
          courseData?.length || 0,
          totalLectures,
        ],
        backgroundColor: ["#3b82f6", "#8b5cf6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <HomeLayout>
      <main
        className="
          min-h-[90vh]
          w-full
          px-4
          py-12
          text-white
          sm:px-6
          md:px-10
          lg:px-16
          xl:px-20
        "
      >
        <h1
          className="
            mb-8
            text-center
            text-2xl
            font-bold
            sm:text-3xl
            md:mb-10
          "
        >
          Admin Dashboard
        </h1>

        {/* ================= STAT CARDS ================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <div className="rounded-lg bg-base-200 p-5 text-center shadow sm:p-6">
            <h2 className="text-3xl font-bold text-yellow-500">
              {allUsersCount || 0}
            </h2>
            <p className="mt-2 text-sm sm:text-base">
              Registered Users
            </p>
          </div>

          <div className="rounded-lg bg-base-200 p-5 text-center shadow sm:p-6">
            <h2 className="text-3xl font-bold text-green-500">
              {enrolledUsersCount || 0}
            </h2>
            <p className="mt-2 text-sm sm:text-base">
              Enrolled Users
            </p>
          </div>

          <div className="rounded-lg bg-base-200 p-5 text-center shadow sm:p-6">
            <h2 className="text-3xl font-bold text-blue-500">
              {courseData?.length || 0}
            </h2>
            <p className="mt-2 text-sm sm:text-base">
              Total Courses
            </p>
          </div>

          <div className="rounded-lg bg-base-200 p-5 text-center shadow sm:p-6">
            <h2 className="text-3xl font-bold text-purple-500">
              {totalLectures}
            </h2>
            <p className="mt-2 text-sm sm:text-base">
              Total Lectures
            </p>
          </div>
        </div>

        {/* ================= CHARTS ================= */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-6
            lg:mt-10
            lg:grid-cols-2
            lg:gap-8
          "
        >
          <div className="min-w-0 rounded-lg bg-base-200 p-4 shadow sm:p-6">
            <h2 className="mb-5 text-center text-lg font-semibold sm:text-xl">
              Users Overview
            </h2>

            <div className="mx-auto w-full max-w-[420px]">
              <Pie
                data={userData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </div>

          <div className="min-w-0 rounded-lg bg-base-200 p-4 shadow sm:p-6">
            <h2 className="mb-5 text-center text-lg font-semibold sm:text-xl">
              Course Statistics
            </h2>

            <div className="relative h-[250px] w-full sm:h-[300px]">
              <Bar
                data={courseDataChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* ================= COURSES ================= */}

        <section className="mt-8 lg:mt-10">
          <div
            className="
              mb-5
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <h2 className="text-xl font-semibold sm:text-2xl">
              Courses
            </h2>

            <Link
              to="/course/create"
              className="
                w-full
                rounded-md
                bg-yellow-500
                px-4
                py-2
                text-center
                font-semibold
                text-black
                transition
                hover:bg-yellow-400
                sm:w-auto
              "
            >
              + Create Course
            </Link>
          </div>

          {/* Horizontal scrolling only on small screens */}

          <div
            className="
              w-full
              overflow-x-auto
              rounded-lg
              bg-base-200
            "
          >
            <table className="w-full min-w-[700px] text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-600 text-left">
                  <th className="whitespace-nowrap p-3 sm:p-4">
                    Course
                  </th>

                  <th className="whitespace-nowrap p-3 sm:p-4">
                    Category
                  </th>

                  <th className="whitespace-nowrap p-3 sm:p-4">
                    Lectures
                  </th>

                  <th className="whitespace-nowrap p-3 sm:p-4">
                    Instructor
                  </th>
                </tr>
              </thead>

              <tbody>
                {courseData?.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b border-gray-700"
                  >
                    <td className="max-w-[250px] p-3 sm:p-4">
                      {course.title}
                    </td>

                    <td className="p-3 sm:p-4">
                      {course.category}
                    </td>

                    <td className="p-3 sm:p-4">
                      {course.numberOfLectures || 0}
                    </td>

                    <td className="max-w-[200px] p-3 sm:p-4">
                      {course.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!courseData?.length && (
              <p className="p-6 text-center text-gray-400">
                No courses available.
              </p>
            )}
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}