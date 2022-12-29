import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import { CreateCommentDto } from '../../../api/post/type/create-comment.dto';
import { LikeDto } from '../../../api/post/type/like.dto';
import userAPI from '../../../api/user/UserApi';
import { MessageToastType } from '../../../components/MessageToast/typings.d';
import { showToastMessage } from '../../../utils/toast.util';

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
  const posts = await postAPI.getUserPosts(params);
  return posts;
});

export const getPostComments = createAsyncThunk('post/getComments', async (postId: any) => {
  try {
    const response = await postAPI.getPostComments(postId);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Unexpected error', MessageToastType.ERROR)
  }
});

export const handleLike = createAsyncThunk('post/Like', async (params: LikeDto) => {
  try {
    const response = await postAPI.likePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Unexpected error', MessageToastType.ERROR)
  }
});

export const handleDislike = createAsyncThunk('post/UnLike', async (params: LikeDto) => {
  try {
    const response = await postAPI.dislikePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Unexpected error', MessageToastType.ERROR)
  }
});

export const addNewComment = createAsyncThunk('home/addNewComment', async (params: CreateCommentDto) => {
  try {
    const response = await postAPI.createComment(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Unexpected error', MessageToastType.ERROR)
  }
});
