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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazopaySlice";
import { getStatsData } from "../../Redux/Slices/StateSlics";

ChartJS.register(
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend
);

export function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const { allUsersCount, subscribedUsersCount } = useSelector(
//     (state) => console.log(state.stat)
//   );
//   const { allPayments, finalMonths, monthlySalesRecord } = useSelector(
//     (state) => console.log(state.razorpay)
//   );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
        {
            lable: "UserDetails",
            data: {allUsersCount, subscribedUsersCount},
            backgroundColor: ["yellow", "green"],
            borderWidth: 1,
            borderColor: ["yellow", "green"]
        }
    ]
  }

  const salesData = {
    labels: [
        "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "white",
    datasets: [
        {
            lable: "Sales/Month",
            data: monthlySalesRecord,
            backgroundColor: ["rgb(255, 99, 132)"],
            borderColor: ["white"],
            borderWidth: 2,
        }
    ]
  }

  const myCourses = useSelector((state) => console.log(state))

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return <HomeLayout></HomeLayout>;
}
