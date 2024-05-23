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

  const token = useParams()

  const [data, setData] = useState({
    password: "",
    resetToken: token.resetToken,
  });

  console.log("data", data);

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  // function to handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // check the empty field
    if (!data.password || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isPassword(data.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    const res = await dispatch(resetPassword(data));
    console.log(res);

    // redirecting to the login page
    if (res.payload.success === true) {
      navigate("/login");
    }
  };

  return (
    <HomeLayout>
      <div
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center h-[100vh]"
      >
        {/* forget password card */}
        <form className="flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="email">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>


          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
