import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import userAPI from '../../../api/user/UserApi';

// Post
export const getHomePosts = createAsyncThunk('post/getPosts', async (userId: string) => {
  const response = await postAPI.getHomePosts(userId);
  return response;
});

export const getComments = createAsyncThunk('post/getComments', async (postId: any) => {
  const response = await postAPI.getComments(postId);
  return response;
});

export const handleLike = createAsyncThunk(
  'post/Like',
  async (params: { userId: any, postId: any }) => {
    await postAPI.likePost(params.userId, params.postId);
    return params.postId;
  }
);

export const handleUnLike = createAsyncThunk(
  'post/UnLike',
  async (params: { userId: any, postId: any }) => {
    await postAPI.unlikePost(params.userId, params.postId);
    return params.postId;
  }
);

// Comment
export const addNewComment = createAsyncThunk('home/addNewComment', async (params: any) => {
  const response = await postAPI.createComment(
    params.postId,
    params.userId,
    params.content,
    params.postUserId
  );
  return response;
});

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (params: { commentId: any, postId: any }) => {
    const response = await postAPI.deleteComment(params.commentId, params.postId);
    return response;
  }
);

// User
export const getUserInfo = createAsyncThunk('user/getUserInfo', async (userId: any) => {
  const response = await userAPI.getUserInfo(userId)
  return response;
});
