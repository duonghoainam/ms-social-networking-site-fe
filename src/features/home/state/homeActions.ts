import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';

// api actions
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const listPost = await postAPI.getPosts();
    return listPost;
  } catch (error) {
    console.log(error);
  }
});

export const getPostComments = createAsyncThunk('post/getComments', async (postId: any) => {
  const listComment = await postAPI.getPostComments(postId);
  return listComment;
});

export const handleLike = createAsyncThunk('post/Like', async (postId: any) => {
  await postAPI.likePost(postId);
  return postId;
});

export const handleUnLike = createAsyncThunk('post/UnLike', async (postId: any) => {
  await postAPI.unLikePost(postId);
  return postId;
});

export const getListRecommendFriends = createAsyncThunk(
  'home/getListRecommendFriends',
  async () => {
    const listRecommend = await postAPI.recommendFriends();
    return listRecommend;
  }
);
