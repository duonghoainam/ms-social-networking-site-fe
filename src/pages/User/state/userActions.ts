import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import { CreateCommentDto } from '../../../api/post/type/create-comment.dto';
import { LikeDto } from '../../../api/post/type/like.dto';
import { UpdatePostDto } from '../../../api/post/type/update-post.dto';
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

export const getPostComments = createAsyncThunk('user/getComments', async (postId: any) => {
  try {
    const response = await postAPI.getPostComments(postId);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const handleLike = createAsyncThunk('user/Like', async (params: LikeDto) => {
  try {
    const response = await postAPI.likePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const handleDislike = createAsyncThunk('user/UnLike', async (params: LikeDto) => {
  try {
    const response = await postAPI.dislikePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const addNewComment = createAsyncThunk('user/addNewComment', async (params: CreateCommentDto) => {
  try {
    const response = await postAPI.createComment(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const updatePost = createAsyncThunk('user/updatePost', async (params: UpdatePostDto) => {
  try {
    const response = await postAPI.updatePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    } else {
      showToastMessage(response.message, MessageToastType.SUCCESS);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const deletePost = createAsyncThunk('user/deletePost', async (postId: string) => {
  try {
    const response = await postAPI.deletePost(postId);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    } else {
      showToastMessage(response.message, MessageToastType.SUCCESS);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});
