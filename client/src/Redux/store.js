import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import RazopaySliceReducer from "./Slices/RazopaySlice";
import StateSlicsReducer from "./Slices/StateSlics";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazopaySliceReducer,
    lecture: LectureSliceReducer,
    state: StateSlicsReducer
  },
  devTools: true,
});

export default store;
