import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isPassword } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

export function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setUserPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isPassword(userPassword.newPassword)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    const res = await dispatch(changePassword(userPassword));

    if (res?.payload?.success) {
      setUserPassword({
        oldPassword: "",
        newPassword: "",
      });

      navigate("/user/profile");
    }
  };

  return (
    <HomeLayout>
      <main
        className="
          min-h-[calc(100vh-120px)]
          flex
          items-center
          justify-center
          px-4
          py-10
          sm:px-6
        "
      >
        <form
          onSubmit={handleFormSubmit}
          className="
            flex
            w-full
            max-w-sm
            flex-col
            justify-center
            gap-5
            rounded-lg
            p-5
            text-white
            shadow-[0_0_10px_black]
            sm:p-6
          "
        >
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            Change Password
          </h1>

          {/* Old Password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold sm:text-lg"
              htmlFor="oldPassword"
            >
              Old Password
            </label>

            <input
              required
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your old password"
              className="
                w-full
                rounded-sm
                border
                border-gray-500
                bg-transparent
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-yellow-500
                sm:text-base
              "
              value={userPassword.oldPassword}
              onChange={handlePasswordChange}
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-semibold sm:text-lg"
              htmlFor="newPassword"
            >
              New Password
            </label>

            <input
              required
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              className="
                w-full
                rounded-sm
                border
                border-gray-500
                bg-transparent
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-yellow-500
                sm:text-base
              "
              value={userPassword.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          {/* Forgot Password */}
          <Link
            to="/forgot-password"
            className="
              text-center
              text-sm
              text-accent
              underline-offset-2
              hover:underline
              sm:text-base
            "
          >
            Forgot password?
          </Link>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              cursor-pointer
              rounded-sm
              bg-yellow-600
              py-2
              text-base
              font-semibold
              transition-all
              duration-300
              hover:bg-yellow-500
              sm:text-lg
            "
          >
            Change Password
          </button>
        </form>
      </main>
    </HomeLayout>
  );
}