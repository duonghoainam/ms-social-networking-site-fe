import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import { FollowParams } from '../../../api/user/type/follow.params';
import userAPI from '../../../api/user/UserApi';

// Post
export const getHomePosts = createAsyncThunk('post/getPosts', async (userId: string) => {
  const response = await postAPI.getHomePosts(userId);
  return response;
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

export const addNewComment = createAsyncThunk('home/addNewComment', async (params: any) => {
  const comment = await postAPI.addComment(params.postId, params.comment);
  return comment;
});

// follow actions
export const getListRecommendedFriends = createAsyncThunk(
  'user/getRecommendedFriends',
  async (userId: string) => {
    try {
      const listRecommend = await userAPI.getListRecommend(userId);
      return listRecommend;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleFollow = createAsyncThunk('home/handleFollow', async (params: FollowParams) => {
  await userAPI.handleFollow(params);
});
