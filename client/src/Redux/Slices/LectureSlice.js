import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/api/v1/courses/${courseId}`);
      toast.promise(response, {
        loading: "Fetching course lectures...",
        success: "Lectures fetched successfully",
        error: "Failed to load the lectures"
      })
      return (await response).data
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
    "/course/lecture/add",
    async (data) => {
      try {

        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("discription", data.discription);

        const response = axiosInstance.post(`/api/v1/courses/${data.id}`, formData);
        toast.promise(response, {
          loading: "Adding course lectures...",
          success: "Lectures added successfully",
          error: "Failed to add the lectures"
        })
        return (await response).data
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );


  export const deleteCourseLectures = createAsyncThunk(
    "/course/lecture/delete",
    async (data) => {
      try {
        const response = axiosInstance.delete(`/api/v1/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
          loading: "Deleting course lectures...",
          success: "Lectures deleted successfully",
          error: "Failed to delete the lecture"
        })
        return (await response).data
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );



const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        console.log(action);
        state.lectures = action?.payload?.lectures;
      })

      .addCase(addCourseLectures.fulfilled, (state, action) => {
        console.log(action);
        state.lectures = action?.payload?.course?.lectures
      })
  },
});

export default lectureSlice.reducer;
