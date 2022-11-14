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

export const logout = createAsyncThunk("auth/logout", async (user, thunkAPI) => {
  const { token } = thunkAPI.getState().auth.user;
  try {
    await axios.get(
      "https://mseller-dev-1.azurewebsites.net/api/auth/logout",
      {
        headers: {
          "Accept-Language": "vi",
          authorization: `Bearer ${token}`
        },
      }
    );
    await AsyncStorage.removeItem("user");
    return true;
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
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
