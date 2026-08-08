import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazopaySlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);

  // Fetch latest user data when profile page loads
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Cancel subscription
  async function handleCancelSubscription() {
    toast("Initiating cancellation...");

    const response = await dispatch(cancelCourseBundle());

    if (response?.payload?.success) {
      await dispatch(getUserData());
      toast.success("Subscription canceled successfully!");
      navigate("/");
    } else {
      toast.error("Failed to cancel subscription");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg p-5 text-white shadow-[0_0_10px_black]">
          
          {/* Avatar */}
          <img
            src={userData?.avatar?.secure_url}
            alt="User Avatar"
            className="mx-auto h-40 w-40 rounded-full border border-black object-cover"
          />

          {/* Name */}
          <h3 className="text-center text-2xl font-semibold capitalize tracking-wider text-yellow-500">
            {userData?.fullName}
          </h3>

          {/* User Information */}
          <div className="flex flex-col gap-2">
            <p className="text-yellow-500">
              Email:{" "}
              <span className="text-white">
                {userData?.email}
              </span>
            </p>

            <p className="text-yellow-500">
              Role:{" "}
              <span className="text-white">
                {userData?.role}
              </span>
            </p>

            <p className="text-yellow-500">
              Subscription:{" "}
              <span className="text-white">
                {userData?.subscription?.status === "active"
                  ? "Active"
                  : "Inactive"}
              </span>
            </p>
          </div>

          {/* Profile Actions */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Change Password */}
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/change-password"
              }
              className="w-1/2 rounded-sm bg-yellow-600 py-2 text-center font-semibold transition-all duration-300 hover:bg-yellow-500"
            >
              Change Password
            </Link>

            {/* Edit Profile */}
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/edit-profile"
              }
              className="w-1/2 rounded-sm bg-yellow-600 py-2 text-center font-semibold transition-all duration-300 hover:bg-yellow-500"
            >
              Edit Profile
            </Link>
          </div>

          {/* Cancel Subscription */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelSubscription}
              className="rounded-sm bg-red-600 py-2 text-center text-base font-semibold transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}