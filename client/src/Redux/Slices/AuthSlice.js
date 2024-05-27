import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

// const initialUserData = localStorage.getItem("data");

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  role: localStorage.getItem('role') || '',
  data: JSON.parse(localStorage.getItem('data')) || null,
  
};


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
export const updateProfile = createAsyncThunk("/user/update/profile", async (data, {rejectWithValue}) => {
  try {
    const userId = data[0];
    const formData = data[1];
    console.log("edit data", userId, " ", formData);

    const res = axiosInstance.put(`/api/v1/users/update/:${userId}`, formData, {
      // withCredentials: true,
    });
    toast.promise(res, {
      loading: "Updating...",
      success: (data) => {
        return data?.data?.message
      },
      error: "Failed to update profile"
    })

    return (await res).data
    
  } catch (error) {
    // toast.error(error?.res?.data?.message);
    return rejectWithValue(error.response?.data?.message || error.message)
  }
});

// get user datails
export const getUserData = createAsyncThunk("/user/details", async ({rejectWithValue}) => {
  try {
    const res = axiosInstance.get(`/api/v1/users/getuser`);
    console.log("get user", res.data);
    return res.data;
  } catch (error) {
    // toast.error(error.message);
    return rejectWithValue(error.response?.data?.message || error.message)
  }
});


// function to change user password
export const changePassword = createAsyncThunk("auth/changePassword", async (userPassword) => {
  try {

    let res = axiosInstance.post(`/api/v1/users/change-password`, userPassword)

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to change password"  
    })
    return (await res).data
    
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
})

// function to handle forget 
export const forgotPassword = createAsyncThunk("auth/forgetPassword", async (email) => {
  console.log(email);
  try {

    let res = axiosInstance.post(`/api/v1/users/forgotpassword`, {email})

    toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to send verification email",
    });
    console.log(res.data);
    return (await res).data
    
  } catch (error) {
    toast.error(error?.res?.data?.message)
  }
});

// function to reset the password
export const resetPassword = createAsyncThunk("auth/reset/Password", async (data) => {
  console.log(data);
  try {
    const {resetToken, password} = data

    let res = axiosInstance.post(`/api/v1/users/reset/${resetToken}`, {password: password})

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    console.log(res.data);
    return (await res).data
    
  } catch (error) {
    toast.error(error?.res?.data?.message)
  }
});

// export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, thunkAPI) => {
//   try {
//     const { resetToken, password } = data; // Destructure resetToken and password from data

//     // You can access additional Redux Toolkit features via thunkAPI
//     const axiosInstance = thunkAPI.extra.axiosInstance; // Assuming you pass axiosInstance as an extra argument when creating the store

//     const res = await axiosInstance.post(`/api/v1/users/reset/${resetToken}`, {
//       password: password,
//     });

//     toast.success(res.data.message);
//     return res.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//     throw error.response.data; // Rethrow the error to let Redux Toolkit handle the rejection
//   }
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // for user login
      .addCase(login.fulfilled, (state, action) => {
        const user = action?.payload?.user;

        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn",JSON.stringify(true));
        localStorage.setItem("role", user?.role);
        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role;
      })

      // for logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = null;
        state.role = '';
      })

      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        const user = action?.payload?.user;
        console.log("in auth slice", user);        
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", JSON.stringify(true)); 
        localStorage.setItem("role", user?.role);
        state.isLoggedIn = true
        state.data = user
        state.role = user?.role
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        const user = action
        console.log("updateuser:", user)
        localStorage.setItem("data", JSON.stringify(user))
        localStorage.setItem("isLoggedIn", JSON.stringify(true)) 
        localStorage.setItem("role", user?.role)
        state.isLoggedIn = true
        state.data = user
      })
      
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
