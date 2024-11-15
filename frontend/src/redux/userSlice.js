import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const signupUser = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginUser = createAsyncThunk(
  "/users/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

const logoutUser = createAsyncThunk(
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

const getAllUsers = createAsyncThunk(
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
  reducers: {
    // signup
    //login
    //logout
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser)
      .addCase(loginUser)
      .addCase(logoutUser)
      .addCase(getAllUsers);
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
