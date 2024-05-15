import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

export default function Profile() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);
  // console.log(userData);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            alt="Avatar"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-2xl font-semibold text-center capitalize text-yellow-500 tracking-wider">
            {userData?.fullName}
          </h3>
          <div className=" flex flex-col gap-1">
            <p className="text-yellow-500">
              Email: <span className="text-white">{userData?.email}</span>
            </p>
            <p className="text-yellow-500">
              Role: <span className="text-white">{userData?.role}</span>
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

          <div className="flex items-center justify-between gap-2">
            <Link
              to="/change-password"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Change password</button>
            </Link>

            <Link
              to="/user/edit-profile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button className="bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 py-2 rounded-sm text-base font-semibold text-center hover:scale-105">Cancel subscription</button>
          )}

        </div>
      </div>
    </HomeLayout>
  );
}
