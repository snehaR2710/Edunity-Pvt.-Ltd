import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: "",
    previewImage: "",
  });

  // Image upload
  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", function () {
        setUserInput((prev) => ({
          ...prev,
          previewImage: this.result,
          thumbnail: uploadedImage,
        }));
      });
    }
  }

  // Input change
  function handleUserInput(e) {
    const { name, value } = e.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Form submit
  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.description ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: "",
        previewImage: "",
      });

      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-full px-4 py-10 sm:px-6 md:px-10">
        <form
          onSubmit={onFormSubmit}
          className="
            relative
            mx-auto
            flex
            w-full
            max-w-4xl
            flex-col
            gap-6
            rounded-lg
            p-4
            text-white
            shadow-[0_0_10px_black]
            sm:p-6
            md:p-8
          "
        >
          {/* Back Button */}
          <Link
            to="/courses"
            className="
              absolute
              left-4
              top-5
              text-2xl
              text-yellow-500
              transition
              hover:text-yellow-400
              sm:left-6
              sm:top-6
            "
          >
            <AiOutlineArrowLeft />
          </Link>

          {/* Heading */}
          <h1 className="pt-8 text-center text-2xl font-bold sm:text-3xl">
            Create New Course
          </h1>

          {/* Main Form */}
          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">

            {/* ================= LEFT ================= */}

            <div className="flex flex-col gap-5">

              {/* Thumbnail */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="image_uploads"
                  className="cursor-pointer"
                >
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="Course preview"
                      className="
                        h-48
                        w-full
                        rounded-md
                        border
                        object-cover
                        sm:h-56
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-48
                        w-full
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-dashed
                        border-gray-500
                        p-4
                        text-center
                        transition
                        hover:border-yellow-500
                        sm:h-56
                      "
                    >
                      <h1 className="text-base font-semibold sm:text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="image_uploads"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-base font-semibold sm:text-lg"
                >
                  Course Title
                </label>

                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  className="
                    w-full
                    rounded-md
                    border
                    border-gray-500
                    bg-transparent
                    px-3
                    py-2
                    outline-none
                    transition
                    focus:border-yellow-500
                  "
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>

              {/* Instructor */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="createdBy"
                  className="text-base font-semibold sm:text-lg"
                >
                  Course Instructor
                </label>

                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter instructor name"
                  className="
                    w-full
                    rounded-md
                    border
                    border-gray-500
                    bg-transparent
                    px-3
                    py-2
                    outline-none
                    transition
                    focus:border-yellow-500
                  "
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div className="flex flex-col gap-5">

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="text-base font-semibold sm:text-lg"
                >
                  Course Category
                </label>

                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter course category"
                  className="
                    w-full
                    rounded-md
                    border
                    border-gray-500
                    bg-transparent
                    px-3
                    py-2
                    outline-none
                    transition
                    focus:border-yellow-500
                  "
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              {/* Description */}
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-base font-semibold sm:text-lg"
                >
                  Course Description
                </label>

                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter course description"
                  className="
                    min-h-[180px]
                    w-full
                    resize-none
                    rounded-md
                    border
                    border-gray-500
                    bg-transparent
                    px-3
                    py-2
                    outline-none
                    transition
                    focus:border-yellow-500
                    sm:min-h-[220px]
                  "
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              rounded-md
              bg-yellow-600
              px-4
              py-3
              text-base
              font-semibold
              transition-all
              duration-300
              hover:bg-yellow-500
              sm:text-lg
            "
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}