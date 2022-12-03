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
  [handleLike.pending.toString()]: (state: any, action: any) => {
    console.log('handleLike pending');
  },
  [handleLike.rejected.toString()]: (state: any, action: any) => {
    console.log('handleLike rejected');
  },
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
    console.log('handleLike fulfilled');
  },

  // Handle unlike post
  [handleUnLike.pending.toString()]: (state: any, action: any) => {
    console.log('handleUnLike pending');
  },
  [handleUnLike.rejected.toString()]: (state: any, action: any) => {
    console.log('handleUnLike rejected');
  },
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
    console.log('handleUnLike fulfilled');
  },

  // Add new comment
  [addNewComment.pending.toString()]: (state: any, action: any) => {
    console.log('addNewComment pending');
  },
  [addNewComment.rejected.toString()]: (state: any, action: any) => {
    console.log('addNewComment rejected');
  },
  [addNewComment.fulfilled.toString()]: (state: any, action: any) => {
    // Update state listcomment
    state.listComment.push(action.payload.data);
    // Update state listPosts
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload.data.postId) {
        post.comments.push(action.payload.data._id);
      }
      return post;
    });
    console.log('addNewComment fulfilled');
  },

  // Delete comment
  [deleteComment.pending.toString()]: (state: any, action: any) => {
    console.log('deleteComment pending');
  },
  [deleteComment.rejected.toString()]: (state: any, action: any) => {
    console.log('deleteComment rejected');
  },
  [deleteComment.fulfilled.toString()]: (state: any, action: any) => {
    state.listComment = action.payload.data;
    console.log('deleteComment fulfilled');
  },

  // Get user info
  [getUserInfo.pending.toString()]: (state: any, action: any) => {
    console.log('getUserInfo pending');
  },
  [getUserInfo.rejected.toString()]: (state: any, action: any) => {
    console.log('getUserInfo rejected');
  },
  [getUserInfo.fulfilled.toString()]: (state: any, action: any) => {
    console.log('getUserInfo fulfilled');
  }
};
