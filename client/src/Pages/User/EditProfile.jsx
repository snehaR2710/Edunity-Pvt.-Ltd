import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state) => state?.auth?.isLoggedIn === true
  );

  const userId = useSelector((state) => state?.auth?.data?._id);

  const currentUser = useSelector((state) => state?.auth?.data);

  const [previewImage, setImagePreview] = useState("");

  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
    userId: userId,
  });

  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Load existing user name
  useEffect(() => {
    if (currentUser) {
      setData((prev) => ({
        ...prev,
        fullName: currentUser?.fullName || "",
        userId: currentUser?._id || userId,
      }));
    }
  }, [currentUser, userId]);

  // Handle image upload
  function handleImageUpload(e) {
    const uploadedImage = e.target.files?.[0];

    if (!uploadedImage) return;

    setData((prev) => ({
      ...prev,
      avatar: uploadedImage,
    }));

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };

    fileReader.readAsDataURL(uploadedImage);
  }

  // Handle name change
  const handleNameChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  async function onFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", data.fullName);

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const newUserData = [data.userId, formData];

    const res = await dispatch(updateProfile(newUserData));

    console.log("Update profile response:", res);

    // Refresh user data
    await dispatch(getUserData());

    if (res?.payload?.success === true) {
      navigate("/user/profile");
    }
  }

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
          onSubmit={onFormSubmit}
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
          <h1 className="text-center text-2xl font-semibold sm:text-3xl">
            Edit Profile
          </h1>

          {/* Avatar */}
          <label
            htmlFor="image_uploads"
            className="mx-auto cursor-pointer"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="
                  h-24
                  w-24
                  rounded-full
                  object-cover
                  border-2
                  border-yellow-500
                  sm:h-28
                  sm:w-28
                "
              />
            ) : currentUser?.avatar?.secure_url ? (
              <img
                src={currentUser.avatar.secure_url}
                alt="Current profile"
                className="
                  h-24
                  w-24
                  rounded-full
                  object-cover
                  border-2
                  border-yellow-500
                  sm:h-28
                  sm:w-28
                "
              />
            ) : (
              <BsPersonCircle
                className="
                  h-24
                  w-24
                  sm:h-28
                  sm:w-28
                "
              />
            )}
          </label>

          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg,.jpeg,.png,.svg"
            className="hidden"
            onChange={handleImageUpload}
          />

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-base font-semibold sm:text-lg"
            >
              Full Name
            </label>

            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              value={data.fullName}
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
              placeholder="Enter your name"
              onChange={handleNameChange}
            />
          </div>

          {/* Update Button */}
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
            Update Profile
          </button>

          {/* Back */}
          <Link
            to="/user/profile"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              text-center
              text-sm
              font-semibold
              text-accent
              underline-offset-2
              hover:underline
              sm:text-base
            "
          >
            <AiOutlineArrowLeft />
            Go back to profile
          </Link>
        </form>
      </main>
    </HomeLayout>
  );
}