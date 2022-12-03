/* eslint-disable no-unused-vars */
import {
  getComments,
  getPosts,
  handleLike,
  handleUnLike,
  addNewComment,
  deleteComment,
  getUserInfo
} from './homeActions';

export const extraReducers: any = {
  // get all post when login successful
  [getPosts.pending.toString()]: (state: any) => {
    return { ...state, isLoading: true };
  },
  [getPosts.rejected.toString()]: (state: any) => {
    return { ...state, isLoading: false, loadListPostFail: true };
  },
  [getPosts.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, listPost: action.payload.data, loadListPostFail: false, isLoading: false };
  },

  // get all comment of post
  [getComments.pending.toString()]: (state: any, action: any) => {
    return { ...state, isLoadComment: true };
  },
  [getComments.rejected.toString()]: (state: any, action: any) => {
    return { ...state, isLoadComment: false };
  },
  [getComments.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, listComment: action.payload.data, isLoadComment: false };
  },

  // handle like post
  [handleLike.pending.toString()]: (state: any, action: any) => {},
  [handleLike.rejected.toString()]: (state: any, action: any) => {},
  [handleLike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        post.likes.push(currentUser.id);
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes.push(currentUser.id);
        }
      }
      return post;
    });
  },

  // Handle unlike post
  [handleUnLike.pending.toString()]: (state: any, action: any) => {},
  [handleUnLike.rejected.toString()]: (state: any, action: any) => {},
  [handleUnLike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        post.likes = post.likes.filter((item: any) => item !== currentUser.id);
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes = state.selectedPost.likes.filter(
            (item: any) => item !== currentUser.id
          );
        }
      }
      return post;
    });
  },

  // Add new comment
  [addNewComment.pending.toString()]: (state: any, action: any) => {},
  [addNewComment.rejected.toString()]: (state: any, action: any) => {},
  [addNewComment.fulfilled.toString()]: (state: any, action: any) => {
    // Update state listcomment
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    let newComment = action.payload.data;
    const userInfo = { userInfo: currentUser }
    newComment = { ...newComment, ...userInfo }
    state.listComment.push(newComment);
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
    state.listComment = action.payload.data;
  },

  // Get user info
  [getUserInfo.pending.toString()]: (state: any, action: any) => {},
  [getUserInfo.rejected.toString()]: (state: any, action: any) => {},
  [getUserInfo.fulfilled.toString()]: (state: any, action: any) => {}
};
