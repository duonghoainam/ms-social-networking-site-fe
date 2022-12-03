/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import postAPI from '../../api/post/PostApi';
import userAPI from '../../api/user/UserApi';

// Action API
export const getUserById = createAsyncThunk('user/getUserById', async (params: any): Promise<AxiosResponse> => {
  const userInfo = await userAPI.getUserInfo(params);
  return userInfo;
});

export const getFollowerList = createAsyncThunk('user/getFollowerList', async (params: any): Promise<AxiosResponse> => {
  const followerList = await userAPI.getFollowers(params)
  console.log('followerList', followerList.data)
  return followerList;
});

export const getFollowingList = createAsyncThunk('user/getFollowingList', async (params: any): Promise<AxiosResponse> => {
  const followingList = await userAPI.getFollowings(params)
  console.log('followingList', followingList.data)
  return followingList;
});

// Post API
export const getPostsByUserId = createAsyncThunk('user/getPostsByUserId', async (params: any): Promise<AxiosResponse> => {
  const posts = await postAPI.getPostsByUserId(params);
  return posts;
});

// Slice
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    activeId: '',
    userInfo: {},
    followerList: [],
    followingList: [],
    posts: [],
    isLoading: false
  },
  reducers: {
    addActiveId: (state: any, action: any) => {
      state.activeId = action.payload;
    }
  },
  extraReducers: {
    // getUserById
    [getUserById.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled.toString()]: (state: any, action: any) => {
      state.userInfo = action.payload.data;
      state.isLoading = false;
    },
    [getUserById.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },
    // getFollowerList
    [getFollowerList.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getFollowerList.fulfilled.toString()]: (state: any, action: any) => {
      state.followerList = action.payload.data;
      state.isLoading = false;
    },
    [getFollowerList.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },

    //  getFollowingList
    [getFollowingList.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getFollowingList.fulfilled.toString()]: (state: any, action: any) => {
      state.followingList = action.payload.data;
      state.isLoading = false;
    },
    [getFollowingList.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    },

    // getPostsByUserId
    [getPostsByUserId.pending.toString()]: (state: any) => {
      state.isLoading = true;
    },
    [getPostsByUserId.fulfilled.toString()]: (state: any, action: any) => {
      state.posts = action.payload.data;
      state.isLoading = false;
    },
    [getPostsByUserId.rejected.toString()]: (state: any, action: any) => {
      state.isLoading = false;
    }
  }
});

const { reducer: userReducer, actions } = UserSlice;

export const { addActiveId } = actions;
export default userReducer;
