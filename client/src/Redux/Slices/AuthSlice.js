import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

// const initialUserData = localStorage.getItem("data");

// const initialState = {
//   isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//   role: localStorage.getItem('role') || null,
//   data:  localStorage.getItem('data') || null,
  
// };

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  role: localStorage.getItem('role') || '',
  data: JSON.parse(localStorage.getItem('data')) || null,
}

// signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = axiosInstance.post(`/api/v1/users/register`, data);
    toast.promise(response, {
      loading: "wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Faild to create account",
    });

    // getting response resolverd here
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// login
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const response = axiosInstance.post(`/api/v1/users/login`, data);
    toast.promise(response, {
      loading: "wait! Authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Faild to Login",
    });

    // getting response resolverd here
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post(`/api/v1/users/logout`);
    toast.promise(res, {
      loading: "wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Faild to logout ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
});

// upadate profile slice 
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
  try {
    console.log(data);

    const res = axiosInstance.put(`/api/v1/users/update/:${data[0]}`, data[1]);
    toast.promise(res, {
      loading: "Updating...",
      success: (data) => {
        return data?.data?.message
      },
      error: "Failed to update profile"
    })

    return (await res).data
    
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
});

// get user datails
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get(`/api/v1/users/getuser`);
    console.log("get user", res);
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // for user login
      .addCase(login.fulfilled, (state, action) => {
        console.log(action,"", state);
        console.log(action?.payload?.user);

        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      // for logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
      })

      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(action,"", state);
        console.log(action?.payload?.user);
        // if(!action?.payload?.user) return
        
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);  // Store boolean value directly
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true
        state.data = action?.payload?.user
        state.role = action?.payload?.user?.role
      });
         
      
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
