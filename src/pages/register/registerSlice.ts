import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/auth/AuthApi';
import { RegisterParams } from '../../api/auth/type/register.type';
import { ApiResponse } from '../../api/api-response.type';

export const register = createAsyncThunk(
  'auth/register',
  async (args: RegisterParams, thunkAPI) => {
    try {
      const response: ApiResponse = await authAPI.createAccount(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const RegisterSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: ''
  },
  reducers: {
    updateCurrentUser: (state: any, action: any) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: {
    // register
    [register.pending.toString()]: (state: any) => {
      state.loading = true;
    },

    [register.rejected.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.error = 'Đăng ký thất bại !';
    },

    [register.fulfilled.toString()]: (state: any, action: string) => {
      state.loading = false;
    }
  }
});

export const { reducer: RegisterReducer, actions } = RegisterSlice;
export const { updateCurrentUser } = RegisterSlice.actions;
// export const { logout } = actions;
export default RegisterReducer;
