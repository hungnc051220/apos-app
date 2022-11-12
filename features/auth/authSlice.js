import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  message: "",
};

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://mseller-dev-1.azurewebsites.net/api/auth/login",
      user,
      {
        headers: {
          "Accept-Language": "vi",
        },
      }
    );

    let transformResponse = {
      ...response.data,
      token: response.headers.authorization,
    };

    AsyncStorage.setItem("user", JSON.stringify(transformResponse));
    return transformResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.title) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
