/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../api/UserApi';

// Action API
export const getUserById = createAsyncThunk('user/getUserById', async (params) => {
  const userInfo = await userAPI.getUserInfo(params);
  return userInfo;
});

export const updateUser = createAsyncThunk('user/updateUser', async (params) => {
  const updatedUser = await userAPI.updateUser(params);
  return updatedUser;
});

export const updateAvt = createAsyncThunk('user/updateAvt', async (params) => {
  const updatedUser = await userAPI.updateAvt(params);
  return updatedUser;
});

export const unFollow = createAsyncThunk('user/unFollow', async (params) => {
  const unFollowUser = await userAPI.unFollow(params);
  return unFollowUser;
});

export const removeFollow = createAsyncThunk('user/removeFollow', async (params) => {
  const unFollowUser = await userAPI.removeFollow(params);
  console.log(unFollowUser);
  return unFollowUser;
});

export const getPostsByUserId = createAsyncThunk('user/getPostsByUserId', async (params) => {
  const posts = await userAPI.getPostsByUserId(params);
  return posts;
});

export const changePassword = createAsyncThunk('user/changePassword', async (params) => {
  console.log(params);
  const changePasswordUser = await userAPI.changePassword(params);
  return changePasswordUser;
});

// Slice
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    activeId: '',
    userInfo: {},
    posts: [],
    isLoading: false
  },
  reducers: {
    addActiveId: (state: any, action: any) => {
      state.activeId = action.payload;
    }
  },
  extraReducers: {
    [getUserById.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo = action.payload.userInfo;
    },
    [getUserById.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [updateUser.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo = action.payload.user;
      localStorage.setItem('LoginUser', JSON.stringify(state.userInfo));
    },
    [updateUser.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [updateAvt.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [updateAvt.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo = action.payload.user;
      localStorage.setItem('LoginUser', JSON.stringify(state.userInfo));
    },
    [updateAvt.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [unFollow.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [unFollow.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo.following = action.payload.unfollowUser?.following;
    },
    [unFollow.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [removeFollow.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [removeFollow.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo.followers = action.payload.unfollowUser?.followers;
    },
    [removeFollow.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [getPostsByUserId.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getPostsByUserId.fulfilled.toString()]: (state: any, action: any) => {
      state.posts = action.payload.listPost;
      state.isLoading = false;
    },
    [getPostsByUserId.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    [changePassword.pending.toString()]: (state: any) => {},
    [changePassword.rejected.toString()]: (state: any) => {},
    [changePassword.fulfilled.toString()]: (state: any) => {}
  }
});

const { reducer: userReducer, actions } = UserSlice;

export const { addActiveId } = actions;

export default userReducer;
