import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import userAPI from '../../../api/user/UserApi';

export const getUserById = createAsyncThunk('user/getUserById', async (params: any) => {
  const userInfo = await userAPI.getUserInfo(params);
  return userInfo;
});

export const getFollowerList = createAsyncThunk('user/getFollowerList', async (params: any) => {
  const followerList = await userAPI.getFollowers(params);
  return followerList;
});

export const getFollowingList = createAsyncThunk('user/getFollowingList', async (params: any) => {
  const followingList = await userAPI.getFollowings(params);
  return followingList;
});

// Post API
export const getPostsByUserId = createAsyncThunk('user/getPostsByUserId', async (params: any) => {
  const posts = await postAPI.getPostsByUserId(params);
  return posts;
});
