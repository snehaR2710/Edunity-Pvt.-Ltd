import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import RazopaySliceReducer from "./Slices/RazopaySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazopaySliceReducer
  },
  devTools: true,
});

export default store;
