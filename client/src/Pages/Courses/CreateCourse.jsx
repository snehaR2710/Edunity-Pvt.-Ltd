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

  // const [previewImage, setPreviewImage] = useState("");

  const [userInput, setuserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: "",
    previewImage: "",
  });

  // function to handle image
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", function () {
        setuserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  // function to handle user input
  function handleUserInput(e) {
    const {name, value} = e.target;
    setuserInput({
      ...userInput,
      [name]: value,
    });
  }

  // function on form submit
  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.description ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mendatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if (response?.payload?.success) {
      setuserInput({
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
      <div className="h-[90vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl text-bold">Create new course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div className="">
                {/* thumbnail input */}
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="text-lg font-bold">
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
                  accept=".jpg, .jpg, .svg, .png"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="createdBy" className="text-lg font-semibold">
                Course instructor
              </label>
              <input
                required
                type="text"
                name="createdBy"
                id="createdBy"
                placeholder="Course instructor"
                className="bg-transparent px-2 py-1 border"
                value={userInput.createdBy}
                onChange={handleUserInput}
              />
              <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-lg font-semibold">
                  Course category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="course category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-lg font-semibold">
                  Course description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="course description"
                  className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
            </div>

            </div>
          </main>

          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 px-1 text-lg cursor-pointer font-semibold rounded-sm">Create course</button>

        </form>
      </div>
    </HomeLayout>
  );
}
