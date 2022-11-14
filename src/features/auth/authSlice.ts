import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/auth/AuthApi';
import postAPI from '../../api/PostApi';
import userAPI from '../../api/UserApi';
import storage from 'redux-persist/lib/storage';
import { RegisterParams } from '../../api/auth/type/register.type';
import { ApiResponse } from '../../api/api-response.type';

export const LoginUser = createAsyncThunk('auth/LoginUser', async (params, thunkAPI) => {
  try {
    const response = await authAPI.getAccount(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const Logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
  try {
    const response: any = await authAPI.logout(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  console.log('Lấy post của thái');
  const listPosts = await postAPI.getPosts();
  return listPosts;
});
export const Register = createAsyncThunk('auth/Register', async (args: RegisterParams, thunkAPI) => {
  try {
    const response = await authAPI.createAccount(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAllUsers = createAsyncThunk('user/getAll', async (args, thunkAPI) => {
  try {
    const response = await userAPI.getAllUsers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    listUser: [],
    loading: false,
    error: '',
    isLogin: false
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      state.current = action.payload;
    }
  },
  extraReducers: {
    [LoginUser.pending.toString()]: (state: any) => {
      state.loading = true;
      console.log('Đang load');
    },

    [LoginUser.rejected.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = true;
      console.log('Đăng nhập thất bại');
      state.error = 'Đăng nhập thất bại !';
    },

    [LoginUser.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = true;
      state.error = '';
      localStorage.setItem('authTokens', JSON.stringify(action.payload.tokens));
      state.current = action.payload.currentUser;
      localStorage.setItem('LoginUser', JSON.stringify(action.payload.currentUser));
    },

    [getPosts.fulfilled.toString()]: (state: any, action: any) => {
      console.log(action.payload);
    },
    [getAllUsers.pending.toString()]: (state: any, action: any) => {
      state.isLogin = true;
    },
    [getAllUsers.fulfilled.toString()]: (state: any, action: any) => {
      state.isLogin = false;

      state.listUser = action.payload.listUser;
    },
    [getAllUsers.rejected.toString()]: (state: any, action: any) => {},
    [Register.pending.toString()]: (state: any) => {
      state.loading = true;
      console.log('Đang load');
    },

    [Register.rejected.toString()]: (state: any, action: any) => {
      state.loading = false;
      console.log('Đăng ký thất bại');
      state.error = 'Đăng ký thất bại !';
    },

    [Register.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
    },

    [Logout.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = false;
      state.current = {};
      state.listUser = [];
      state.error = '';
      localStorage.removeItem('authTokens');
      localStorage.removeItem('LoginUser');
      storage.removeItem('persist:root');
    },

    [Logout.rejected.toString()]: (state: any, action: any) => {
      state.isLogin = true;
      // localStorage.removeItem('authTokens');
      // localStorage.removeItem('LoginUser');
    },
    [getPosts.fulfilled.toString()]: (state: any, action: any) => {}
  }
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { updateCurrentUser } = AuthSlice.actions;
// export const { Logout } = actions;
export default AuthReducer;
