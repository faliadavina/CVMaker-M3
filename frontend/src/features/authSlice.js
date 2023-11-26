import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const LoginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    try {
      const response = await axios.post('http://194.233.93.124:8000/login', {
        username: user.username,
        password: user.password
      });
  
      const { token } = response.data;  // Assuming the token is returned in the response
  
      // Store the token in local storage
      localStorage.setItem('token', token);
  
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  });

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://194.233.93.124:8000/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});


export const LogOut = createAsyncThunk("user/LogOut", async () => {
  localStorage.removeItem('token');

  await axios.delete('http://194.233.93.124:8000/logout');
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
