import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

// Slice to get all courses ("/course/get"  this is name of AsyncThunk)             
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("courses");
    toast.promise(response, {
        loading: "loading course data...",
        success: "Courses loaded successfully",
        error: "Faild to get courses",
    });

    return (await response).data.courses;

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// slice to create courses
export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {

    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("category", data?.category)
    formData.append("description", data?.description)
    formData.append("createdBy", data?.createdBy)
    formData.append("thumbnail", data?.thumbnail)

    const response = axiosInstance.post("courses", formData);
    toast.promise(response, {
      loading: "Creating new course",
      success: "Course created successfully",
      error: "Faild to create course"
    });

    return (await response).data
    
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const couseSlice = createSlice({
  name: "couses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        if (action.payload) {
            console.log(action.payload);
            state.courseData = [...action.payload];
        }
      })
  },
});

export default couseSlice.reducer;
