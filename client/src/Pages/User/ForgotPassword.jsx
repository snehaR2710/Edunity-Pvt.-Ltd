import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

export function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      setMessage(response.message);
      toast.success(response.message);
      setEmail("");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
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
              Forgot Password
            </h2>
            {message && <div className="text-green-500">{message}</div>}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-sm py-2 px-3 bg-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-sm"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}
