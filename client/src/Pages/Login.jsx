import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(loginData));

    console.log("response", response);

    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div
        className="
          flex
          min-h-[calc(100vh-120px)]
          w-full
          items-center
          justify-center
          px-4
          py-10
          sm:px-6
        "
      >
        <form
          noValidate
          onSubmit={onLogin}
          className="
            flex
            w-full
            max-w-sm
            flex-col
            justify-center
            gap-4
            rounded-lg
            p-5
            text-white
            shadow-[0_0_10px_black]
            sm:p-6
          "
        >
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            Login Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-base font-semibold sm:text-lg"
            >
              Email
            </label>

            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="your@gmail.com"
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
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-base font-semibold sm:text-lg"
            >
              Password
            </label>

            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Your Password"
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
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              mt-1
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
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="cursor-pointer text-yellow-500 hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}