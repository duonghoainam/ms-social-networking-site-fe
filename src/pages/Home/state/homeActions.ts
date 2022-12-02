import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';

export const getPosts = createAsyncThunk('post/getPosts', async (userId: any) => {
  const response = await postAPI.getPosts(userId);
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
