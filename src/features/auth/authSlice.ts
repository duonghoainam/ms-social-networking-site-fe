import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/auth/AuthApi';
import postAPI from '../../api/PostApi';
import userAPI from '../../api/UserApi';
import storage from 'redux-persist/lib/storage';
import { RegisterParams } from '../../api/auth/type/register.type';
import { LoginParams } from '../../api/auth/type/login.type';
import { ApiResponse } from '../../api/api-response.type';

export const login = createAsyncThunk('auth/login', async (params: LoginParams, thunkAPI) => {
  try {
    const response: ApiResponse = await authAPI.login(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
  try {
    const response: any = await authAPI.logout(params);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const listPosts = await postAPI.getPosts();
  return listPosts;
});

export const getAllUsers = createAsyncThunk('user/getAll', async (args, thunkAPI) => {
  try {
    const response = await userAPI.getAllUsers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
    // Login
    [login.pending.toString()]: (state: any) => {
      state.loading = true;
    },

    [login.rejected.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = true;
      state.error = 'Đăng nhập thất bại !';
    },

    [login.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = true;
      state.error = '';
      localStorage.setItem('authTokens', JSON.stringify(action.payload.tokens));
      state.current = action.payload.currentUser;
      localStorage.setItem('login', JSON.stringify(action.payload.currentUser));
    },

    [getPosts.fulfilled.toString()]: (state: any, action: any) => {},
    [getAllUsers.pending.toString()]: (state: any, action: any) => {
      state.isLogin = true;
    },
    [getAllUsers.fulfilled.toString()]: (state: any, action: any) => {
      state.isLogin = false;

      state.listUser = action.payload.listUser;
    },
    [getAllUsers.rejected.toString()]: (state: any, action: any) => {},

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
    },
    // logout

    [logout.fulfilled.toString()]: (state: any, action: any) => {
      state.loading = false;
      state.isLogin = false;
      state.current = {};
      state.listUser = [];
      state.error = '';
      localStorage.removeItem('authTokens');
      localStorage.removeItem('login');
      storage.removeItem('persist:root');
    },

    [logout.rejected.toString()]: (state: any, action: any) => {
      state.isLogin = true;
      // localStorage.removeItem('authTokens');
      // localStorage.removeItem('LoginUser');
    },
    [getPosts.fulfilled.toString()]: (state: any, action: any) => {}
  }
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { updateCurrentUser } = AuthSlice.actions;
// export const { logout } = actions;
export default AuthReducer;
