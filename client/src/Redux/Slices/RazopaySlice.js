import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// function to get the api key
export const getRazorpayId = createAsyncThunk("/razorpayId/get", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/payments/razopay-key");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to purchase the course bundle
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
      const response = await axiosInstance.get("/api/v1/payments/subscribe");
      // toast.promise(response, {
      //   loading: "Wait a moment!!....",
      //   success: (data) => {
      //     return data?.data?.message;
      //   },
      //   error: "Failed!!"
      // });
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk("/Payment/verify", async (paymentDetails) => {
  console.log("paymentDetails", paymentDetails);
    try {
      const response = await axiosInstance.post("/api/v1/payments/verify", {

        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_subscription_id: paymentDetails.razorpay_subscription_id,
        razorpay_signature: paymentDetails.razorpay_signature

      });
      toast.promise(response, {
        loading: "Verifing....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to varify!!"
      });
      console.log(response);
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

  export const getPaymentRecord = createAsyncThunk("/Payment/record", async () => {
    try {
      const response = axiosInstance.get("/api/v1/payments?count=20");
      toast.promise(response, {
        loading: "Payment records in progress....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment recored"
      });
      console.log(response);
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

  export const cancelCourseBundle = createAsyncThunk("/cancel/course", async () => {
    try {
      const response = axiosInstance.post("/api/v1/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing the bundle...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to unsubscibe the bundle"
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
          .addCase(getRazorpayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key
          })

          .addCase(getRazorpayId.rejected, () => {
            toast.error("Failed to get razorpay id");
          })

          .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id
          })

          .addCase(verifyUserPayment.fulfilled, (state, action) => {
            console.log("action", action);
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
          })

          .addCase(verifyUserPayment.rejected, (state, action) => {
            console.log("action", action);
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
          })

          .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
          })
  },
});

export default razorpaySlice.reducer;