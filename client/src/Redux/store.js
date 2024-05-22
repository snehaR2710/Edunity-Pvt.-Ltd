import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import RazopaySliceReducer from "./Slices/RazopaySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazopaySliceReducer,
    lecture: LectureSliceReducer,
  },
  devTools: true,
});

export default store;
