import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/auth/AuthApi';
import postAPI from '../../api/PostApi';
import userAPI from '../../api/UserApi';
import { RegisterParams } from '../../api/auth/type/register.type';
import { LoginParams } from '../../api/auth/type/login.type';
import { ApiResponse } from '../../api/api-response.type';
import { AuthState } from './state.type';

export const login = createAsyncThunk(
  'auth/login',
  async (params: LoginParams, thunkAPI): Promise<ApiResponse> => {
    try {
      const response: ApiResponse = await authAPI.login(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data) as unknown as ApiResponse;
    }
  }
);

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
    currentUser: {},
    listUser: [],
    loading: false,
    error: '',
    isLogin: false
  },
  reducers: {
    updateCurrentUser: (state: AuthState, action: any) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: {
    // Login
    [login.pending.toString()]: (state: AuthState) => {
      state.loading = true;
    },

    [login.rejected.toString()]: (state: AuthState, action: any) => {
      state.loading = false;
      state.isLogin = true;
      state.error = 'Đăng nhập thất bại !';
    },

    [login.fulfilled.toString()]: (state: AuthState, action: any) => {
      state.loading = false;
      state.isLogin = true;
      state.error = '';
      localStorage.setItem('accessToken', JSON.stringify(action.payload.data.accessToken));
      state.currentUser = action.payload.currentUser;
      localStorage.setItem('currentUser', JSON.stringify(action.payload.data.user));
    },

    [getPosts.fulfilled.toString()]: (state: AuthState, action: any) => {},
    [getAllUsers.pending.toString()]: (state: AuthState, action: any) => {
      state.isLogin = true;
    },
    [getAllUsers.fulfilled.toString()]: (state: AuthState, action: any) => {
      state.isLogin = false;

      state.listUser = action.payload.listUser;
    },
    [getAllUsers.rejected.toString()]: (state: AuthState, action: any) => {},

    // register
    [register.pending.toString()]: (state: AuthState) => {
      state.loading = true;
    },

    [register.rejected.toString()]: (state: AuthState, action: any) => {
      state.loading = false;
      state.error = 'Đăng ký thất bại !';
    },

    [register.fulfilled.toString()]: (state: AuthState, action: string) => {
      state.loading = false;
    },
    // logout

    [logout.fulfilled.toString()]: (state: AuthState, action: any) => {
      state.loading = false;
      state.isLogin = false;
      state.currentUser = {};
      state.listUser = [];
      state.error = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('persist:root');
    },

    [logout.rejected.toString()]: (state: AuthState, action: any) => {
      state.isLogin = true;
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('LoginUser');
    },
    [getPosts.fulfilled.toString()]: (state: AuthState, action: any) => {}
  }
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { updateCurrentUser } = AuthSlice.actions;
// export const { logout } = actions;
export default AuthReducer;
