import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};

// function to get the stats data from backend
export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const response = axiosInstance.get("")
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const stateSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default stateSlice.reducer;
