import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};

// // function to get the stats data from backend
// Get user statistics
export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("/api/v1/admin/stats/users");
    toast.promise(response, {
      loading: "Getting the stats...",
      success: (data) => data?.data?.message || "Stats fetched successfully",
      error: "Failed to fetch stats"
    })
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const stateSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
  state.allUsersCount =
    action?.payload?.allUsersCount || 0;

  state.subscribedUsersCount =
    action?.payload?.subscribedUsersCount || 0;
});
  },
});

export default stateSlice.reducer;