import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import { CreateCommentDto } from '../../../api/post/type/create-comment.dto';
import { LikeDto } from '../../../api/post/type/like.dto';
import { FollowParams } from '../../../api/user/type/follow.params';
import userAPI from '../../../api/user/UserApi';

// Post
export const getHomePosts = createAsyncThunk('post/getPosts', async (userId: string) => {
  const response = await postAPI.getHomePosts(userId);
  return response;
});

export const getPostComments = createAsyncThunk('post/getComments', async (postId: any) => {
  const response = await postAPI.getPostComments(postId);
  return response;
});

export const handleLike = createAsyncThunk('post/Like', async (params: LikeDto) => {
  await postAPI.likePost(params);
  return params;
});

export const handleDislike = createAsyncThunk('post/UnLike', async (params: LikeDto) => {
  await postAPI.dislikePost(params);
  return params;
});

export const addNewComment = createAsyncThunk('home/addNewComment', async (params: CreateCommentDto) => {
  const comment = await postAPI.createComment(params);
  return comment;
});

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (params: { postId: any, commentId: any }) => {
    const response = await postAPI.deleteComment(params.postId, params.commentId);
    return response;
  }
);

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
