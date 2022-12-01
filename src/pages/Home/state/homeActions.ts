import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';

// api actions
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const listPost = await postAPI.getPosts();
  return listPost;
});

export const getComments = createAsyncThunk('post/getComments', async (postId: any) => {
  const listComment = await postAPI.getComments(postId)
  return listComment;
});

// Handele like post in new feed
export const handleLike = createAsyncThunk('post/Like', async (params: { userId: any, postId: any }) => {
  await postAPI.likePost(params.userId, params.postId);
  return params.postId;
});

export const handleUnLike = createAsyncThunk('post/UnLike', async (params: { userId: any, postId: any }) => {
  await postAPI.unlikePost(params.userId, params.postId);
  return params.postId;
});

// Add comment
export const addNewComment = createAsyncThunk('home/addNewComment', async (params: any) => {
  const comment = await postAPI.createComment(
    params.postId,
    params.userId,
    params.content,
    params.commentId,
    params.postUserId
  );
  return comment;
});
