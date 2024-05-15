// import { color } from "chart.js/helpers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazopaySlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  console.log("key", razorpayKey);
  const subscription_id = useSelector(
    (state) =>  state?.razorpay?.subscription_id
  );

  console.log("subscription_id", subscription_id);

  const userdata = useSelector((state) => state?.auth?.data);

  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentVerified);


    // for storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();

    console.log(razorpayKey, " ", subscription_id);

    // checking for empty payment credential
    if (!razorpayKey || !subscription_id) {
      toast.error("Somthing went wrong!!");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription: subscription_id,
      name: "Edunity Pvt. Ltd.",
      discription: "Subscription",
      theme: {
        color: "#528FF0",
      },
      prefill: {
        email: userdata.email,
        name: userdata.fullName,
      },

      // this function run after successfull payment
      handler: async function (response) {
        console.log("response", response);
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment successfully");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));
        console.log("res", res);

        // redirecting the user according to the verification status
        (res?.payload?.success)
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  }

   useEffect(() => {
    (async () => {
      await dispatch(getRazorpayId());
      await dispatch(purchaseCourseBundle());
    }) ();  
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative rounded-sm">
          <h1 className="bg-yellow-600 absolute top-0 w-full text-center hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-4 text-2xl font-bold rounded-tl-md rounded-tr-md">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access available course of our
              platform for{" "}
              <span className="text-yellow-500 font-semibold">
                <br />1 Year duration
              </span>{" "}
              All the existing and new launched courses will be also available
            </p>

            <p className="flex items-center justify-center text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499 only</span>
            </p>

            <div className="text-gray-200">
                <p className="">100% refund on cancellation</p>
                <p className="">* Terms and conditions applied *</p>
            </div>
            <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-3 px-2 rounded-sm w-full font-semibold text-xl absolute bottom-0 left-0 rounded-br-md rounded-bl-md">Buy now</button>

          </div>
        </div>
      </form>
    </HomeLayout>
  );
}
