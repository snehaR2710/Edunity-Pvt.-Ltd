import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  changePassword,
  resetPassword,
} from "../../Redux/Slices/AuthSlice";

export function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (token) {
        await dispatch(
          resetPassword({ resetToken: token, password: newPassword })
        ).unwrap();
        toast.success("Password reset successfully");
      } else {
        await dispatch(changePassword({ oldPassword, newPassword })).unwrap();
        toast.success("Password changed successfully");
      }

      // Password changed successfully
      setOldPassword("");
      setNewPassword("");
      // You can redirect the user or show a success message here
      navigate("/user/profile");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-semibold text-center">
            {token ? "Reset Password" : "Change Password"}
            </h2>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            {!token && (
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="border rounded-sm py-2 px-3 bg-transparent"
              />
            )}

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border rounded-sm py-2 px-3 bg-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-sm"
            >
              {isLoading ? "Processing..." : token ? "Reset Password" : "Change Password"}
            </button>

            {!token && (
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-sm"
              >
                Forgot Password
              </button>
            )}
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}
