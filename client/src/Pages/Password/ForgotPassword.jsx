import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { isEmail } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

export function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check empty field
    if (!email) {
      toast.error("Email is required");
      return;
    }

    // Validate email
    if (!isEmail(email)) {
      toast.error("Invalid email");
      return;
    }

    // Call API
    const res = await dispatch(forgotPassword(email));

    console.log("Forgot password response:", res);

    // Clear input
    setEmail("");
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
            Forgot Password
          </h1>

          {/* Description */}
          <p className="text-center text-sm leading-6 text-gray-300 sm:text-base">
            Enter your registered email. We will send a verification link to
            your email from which you can reset your password.
          </p>

          {/* Email */}
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="email"
              className="text-base font-semibold sm:text-lg"
            >
              Email
            </label>

            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email"
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

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
            Get Verification Link
          </button>

          {/* Login */}
          <p className="text-center text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent underline-offset-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </main>
    </HomeLayout>
  );
}