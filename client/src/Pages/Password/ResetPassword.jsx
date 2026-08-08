import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { isPassword } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetToken } = useParams();

  const [data, setData] = useState({
    password: "",
    resetToken: resetToken,
  });

  // Handle input
  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!data.password || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    // Validate password
    if (!isPassword(data.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    const res = await dispatch(resetPassword(data));

    console.log("Reset password response:", res);

    // Redirect to login
    if (res?.payload?.success === true) {
      navigate("/login");
    }
  };

  return (
    <HomeLayout>
      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-10 sm:px-6">

        <form
          onSubmit={handleFormSubmit}
          className="
            w-full
            max-w-sm
            flex
            flex-col
            justify-center
            gap-5
            rounded-lg
            p-5
            sm:p-6
            text-white
            shadow-[0_0_10px_black]
          "
        >
          {/* Heading */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold">
            Reset Password
          </h1>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-base sm:text-lg font-semibold"
              htmlFor="password"
            >
              New Password
            </label>

            <input
              required
              type="password"
              name="password"
              id="password"
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
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          {/* Submit */}
          <button
            className="
              w-full
              rounded-sm
              bg-yellow-600
              py-2
              text-base
              font-semibold
              cursor-pointer
              transition-all
              duration-300
              hover:bg-yellow-500
              sm:text-lg
            "
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </main>
    </HomeLayout>
  );
}