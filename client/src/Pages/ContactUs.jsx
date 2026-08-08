import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

export function ContactUs() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    if (
      !userInput.name ||
      !userInput.email ||
      !userInput.message
    ) {
      toast.error("Please write your query!!");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = axiosInstance.post(
        "contact",
        userInput
      );

      toast.promise(response, {
        loading: "Submitting your message",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });

      const contactResponse = await response;

      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed.....");
    }
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
          py-12
          sm:px-6
        "
      >
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="
            flex
            w-full
            max-w-[22rem]
            flex-col
            items-center
            justify-center
            gap-3
            rounded-md
            p-5
            text-white
            shadow-[0_0_10px_black]
            sm:max-w-[28rem]
            sm:p-6
          "
        >
          <h1 className="mb-2 text-2xl font-semibold sm:text-3xl">
            Contact Form
          </h1>

          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="name"
              className="text-base font-semibold sm:text-lg"
            >
              Name
            </label>

            <input
              name="name"
              id="name"
              type="text"
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
                focus:border-yellow-500
                sm:text-base
              "
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="email"
              className="text-base font-semibold sm:text-lg"
            >
              Email
            </label>

            <input
              name="email"
              id="email"
              type="email"
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
                focus:border-yellow-500
                sm:text-base
              "
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="message"
              className="text-base font-semibold sm:text-lg"
            >
              Message
            </label>

            <textarea
              name="message"
              id="message"
              placeholder="Your message..."
              className="
                h-32
                w-full
                resize-none
                rounded-sm
                border
                border-gray-500
                bg-transparent
                px-3
                py-2
                text-sm
                outline-none
                focus:border-yellow-500
                sm:h-40
                sm:text-base
              "
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="
              mt-2
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
            Submit
          </button>
        </form>
      </main>
    </HomeLayout>
  );
}