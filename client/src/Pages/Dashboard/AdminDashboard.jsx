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
  Legend,
);

export function AdminDashboard() {
  const dispatch = useDispatch();

  // Redux se data lena
  const { allUsersCount, enrolledUsersCount } = useSelector(
    (state) => state.state,
  );

  const { courseData } = useSelector((state) => state.course);

  // Dashboard load hone par data fetch karna
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStatsData());
  }, [dispatch]);

  // -----------------------------
  // Users Chart Data
  // -----------------------------

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],

    datasets: [
      {
        label: "Users",

        data: [allUsersCount || 0, enrolledUsersCount || 0],

        backgroundColor: ["#eab308", "#22c55e"],

        borderColor: ["#eab308", "#22c55e"],

        borderWidth: 1,
      },
    ],
  };

  // -----------------------------
  // Course Chart Data
  // -----------------------------

  const courseDataChart = {
    labels: ["Courses", "Lectures"],

    datasets: [
      {
        label: "Course Statistics",

        data: [
          courseData?.length || 0,

          courseData?.reduce(
            (total, course) => total + (course.numberOfLectures || 0),
            0,
          ) || 0,
        ],

        backgroundColor: ["#3b82f6", "#8b5cf6"],

        borderWidth: 1,
      },
    ],
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] px-4 py-10 sm:px-8 md:px-16">
        {/* Heading */}

        <h1 className="mb-10 text-center text-3xl font-bold">
          Admin Dashboard
        </h1>

        {/* ---------------- STAT CARDS ---------------- */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Users */}

          <div className="rounded-lg bg-base-200 p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-yellow-500">
              {allUsersCount || 0}
            </h2>

            <p className="mt-2">Registered Users</p>
          </div>

          {/* Enrolled Users */}

          <div className="rounded-lg bg-base-200 p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-green-500">
              {enrolledUsersCount || 0}
            </h2>

            <p className="mt-2">Enrolled Users</p>
          </div>

          {/* Courses */}

          <div className="rounded-lg bg-base-200 p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-500">
              {courseData?.length || 0}
            </h2>

            <p className="mt-2">Total Courses</p>
          </div>

          {/* Lectures */}

          <div className="rounded-lg bg-base-200 p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-purple-500">
              {courseData?.reduce(
                (total, course) => total + (course.numberOfLectures || 0),
                0,
              ) || 0}
            </h2>

            <p className="mt-2">Total Lectures</p>
          </div>
        </div>

        {/* ---------------- CHARTS ---------------- */}

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Users Chart */}

          <div className="rounded-lg bg-base-200 p-6 shadow">
            <h2 className="mb-5 text-center text-xl font-semibold">
              Users Overview
            </h2>

            <Pie data={userData} />
          </div>

          {/* Courses Chart */}

          <div className="rounded-lg bg-base-200 p-6 shadow">
            <h2 className="mb-5 text-center text-xl font-semibold">
              Course Statistics
            </h2>

            <Bar data={courseDataChart} />
          </div>
        </div>

        {/* ---------------- COURSES ---------------- */}

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Courses</h2>

            <Link
              to="/course/create"
              className="rounded-md bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
            >
              + Create Course
            </Link>
          </div>

          {/* Course table */}

          <div className="overflow-x-auto rounded-lg bg-base-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600 text-left">
                  <th className="p-4">Course</th>

                  <th className="p-4">Category</th>

                  <th className="p-4">Lectures</th>

                  <th className="p-4">Instructor</th>
                </tr>
              </thead>

              <tbody>
                {courseData?.map((course) => (
                  <tr key={course._id} className="border-b border-gray-700">
                    <td className="p-4">{course.title}</td>

                    <td className="p-4">{course.category}</td>

                    <td className="p-4">{course.numberOfLectures || 0}</td>

                    <td className="p-4">{course.createdBy}</td>
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
        </div>
      </div>
    </HomeLayout>
  );
}
