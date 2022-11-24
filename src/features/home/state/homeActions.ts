import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';

// api actions
// hàm lấy tất cả bài post khi vào trang chủ
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const listPosts = await postAPI.getPosts();
    return listPosts;
  } catch (error) {
    console.log(error);
  }
});

// hàm lấy tất cả comment của bài post
export const getCommentsByPostID = createAsyncThunk('post/getComments', async (postId: any) => {
  const listComment = await postAPI.getCommentByPostID(postId);
  return listComment;
});

// hàm xử lý like hay bỏ like bài post
export const handleLike = createAsyncThunk('post/Like', async (postId: any) => {
  await postAPI.likePost(postId);
  return postId;
});

export const handleUnLike = createAsyncThunk('post/UnLike', async (postId: any) => {
  await postAPI.unLikePost(postId);
  return postId;
});

// hàm lấy danh sách gợi ý kết bạn
export const getListRecommendFriends = createAsyncThunk(
  'home/getListRecommendFriends',
  async () => {
    const listRecommend = await postAPI.recommendFriends();
    return listRecommend;
  }
);

// slice actions
export const showPostDetail = (state: any, action: any): void => {
  // state.isShowDetail = true;
  // state.activePostId = action.payload;
};
export const hidePostDetail = (state: any, action: any): void => {
  // state.isShowDetail = false;
  // state.activePostId = '';
  // state.post = {};
};
export const showReportModal = (state: any, action: any): void => {
  // state.isShowReportModal = true;
};
export const hideReportModal = (state: any, action: any): void => {
  // state.isShowReportModal = false;
};
export const showAllLikesModal = (state: any, action: any): void => {
  state.isShowAllLikeModal = true;
};
export const hideAllLikesModal = (state: any, action: any): void => {
  state.listLikeComment = {
    isShowAllLikeModal: false,
    listUsers: []
  };
};
