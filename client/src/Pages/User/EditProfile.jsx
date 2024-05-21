import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

export default function EditProfile() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // state.auth.isLoggedIn === true

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn === true)
  console.log("isLoggedIn", isLoggedIn);

  const userId = useSelector((state) => state?.auth?.data?._id)

  const [previewImage, setImagePreview] = useState("");

  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
    userId,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setData({
        ...data,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  }

  // function to set the name of user
  const setName = (event) => {
    const { name, value } = event.target;
    const newUserdata = { ...data, [name]: value };
    setData(newUserdata);
  };

  async function onFormSubmit(e) {
    e.preventDefault();

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    const newUserdata = [data.userId, formData];

    // dispatching the api call using the thunk
    const res = await dispatch(updateProfile(newUserdata));
    console.log("res", res);

    dispatch(getUserData())
     

    //if (response?.payload?.success) navigate("/");
    if (res?.payload?.success === true) navigate("/user/profile");
  }

  


  return (
    <HomeLayout>
      <div className="h-[90vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 shadow-[0_0_10px_black] rounded-lg p-4 text-white w-80 min-h-[26rem]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>

          {/* avatar input */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-28 h-28 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>

          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .jpeg, .svg"
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              value={data.fullName}
              className="bg-transparent border rounded-sm py-1 px-2"
              placeholder="Enter your name"
              onChange={setName}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 hover:scale-105 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
          >
            Update profile
          </button>

          <Link to="/user/profile">
            <p className="link text-accent flex items-center justify-center gap-2 text-lg font-semibold cursor-pointer w-full">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
