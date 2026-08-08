import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Handle input
  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData((prev) => ({
        ...prev,
        avatar: uploadedImage,
      }));

      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  // Create account
  async function createNewAccount(event) {
    event.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName
    ) {
      toast.error("Please fill all the details");
      return;
    }

    // Name validation
    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    // Email validation
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email");
      return;
    }

    // Password validation
    if (!isPassword(signupData.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    const formData = new FormData();

    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));

    console.log("response", response);

    if (response?.payload?.success) {
      navigate("/");
    }

    // Clear form
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <main
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
          onSubmit={createNewAccount}
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
            Registration Page
          </h1>

          {/* Avatar */}
          <label
            htmlFor="image_uploads"
            className="
              mx-auto
              cursor-pointer
              rounded-full
              transition
              hover:scale-105
            "
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="
                  h-24
                  w-24
                  rounded-full
                  border-2
                  border-yellow-500
                  object-cover
                  sm:h-28
                  sm:w-28
                "
              />
            ) : (
              <BsPersonCircle
                className="
                  h-24
                  w-24
                  text-gray-300
                  sm:h-28
                  sm:w-28
                "
              />
            )}
          </label>

          <input
            type="file"
            name="image_uploads"
            className="hidden"
            id="image_uploads"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={getImage}
          />

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-base font-semibold sm:text-lg"
            >
              Name
            </label>

            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Your Name"
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
              value={signupData.fullName}
            />
          </div>

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
              value={signupData.email}
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
              value={signupData.password}
            />
          </div>

          {/* Submit */}
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
            Create Account
          </button>

          {/* Login */}
          <p className="text-center text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-yellow-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </main>
    </HomeLayout>
  );
}