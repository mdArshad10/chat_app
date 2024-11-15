import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";
import { act } from "react";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/users/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    } catch (err) {
      console.log(err.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/users/logout",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/users/all",
  async ({ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        }
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        }
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
