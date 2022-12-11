/* eslint-disable no-unused-vars */
import { User } from '../../../api/user/type/user.type';
import {
  getHomePosts,
  getPostComments,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
  getUserInfo
} from './homeActions';

export const extraReducers: any = {
  // get all post when login successful
  [getHomePosts.pending.toString()]: (state: any) => {
    return { ...state, isLoading: true };
  },
  [getHomePosts.rejected.toString()]: (state: any) => {
    return { ...state, isLoading: false, loadListPostFail: true };
  },
  [getHomePosts.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, listPost: action.payload.data, loadListPostFail: false, isLoading: false };
  },

  // get all comment of post
  [getPostComments.pending.toString()]: (state: any, action: any) => {
    return { ...state, isLoadComment: true };
  },
  [getPostComments.rejected.toString()]: (state: any, action: any) => {
    return { ...state, isLoadComment: false };
  },
  [getPostComments.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, listComment: action.payload.data, isLoadComment: false };
  },

  // handle like post
  [likePost.pending.toString()]: (state: any, action: any) => {},
  [likePost.rejected.toString()]: (state: any, action: any) => {},
  [likePost.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        post.likes.push(currentUser);
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes.push(currentUser);
        }
      }
      return post;
    });
  },

  // Handle unlike post
  [unlikePost.pending.toString()]: (state: any, action: any) => {},
  [unlikePost.rejected.toString()]: (state: any, action: any) => {},
  [unlikePost.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        // post.likes = post.likes.filter((item: any) => item !== currentUser);
        post.likes = post.likes.filter((user: User) => { return user.id !== currentUser.id });
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes = state.selectedPost.likes.filter((user: User) => { return user.id !== currentUser.id });
        }
      }
      return post;
    });
  },

  // Add new comment
  [createComment.pending.toString()]: (state: any, action: any) => {},
  [createComment.rejected.toString()]: (state: any, action: any) => {},
  [createComment.fulfilled.toString()]: (state: any, action: any) => {
    // Update state listcomment
    state.listComment.push(action.payload.data);
    // Update state listPosts
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload.data.postId) {
        post.comments.push(action.payload.data._id);
      }
      return post;
    });
  },

  // Delete comment
  [deleteComment.pending.toString()]: (state: any, action: any) => {},
  [deleteComment.rejected.toString()]: (state: any, action: any) => {},
  [deleteComment.fulfilled.toString()]: (state: any, action: any) => {
    const deletedComment = action.payload.data;
    state.listComment = state.listComment.filter((comment: any) => { return comment._id !== deletedComment._id });
  },

  // Get user info
  [getUserInfo.pending.toString()]: (state: any, action: any) => {},
  [getUserInfo.rejected.toString()]: (state: any, action: any) => {},
  [getUserInfo.fulfilled.toString()]: (state: any, action: any) => {}
};
