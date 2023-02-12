/* eslint-disable no-unused-vars */
import { User } from '../../../api/user/type/user.type';
import {
  getHomePosts,
  handleLike,
  handleDislike,
  addNewComment,
  getListRecommendedFollowings,
  getPostComments,
  deleteComment,
  likeComment,
  unlikeComment
} from './homeActions';
import { getUserById } from '../../User/state/userActions';
import { HomeState } from './homeSlice';

export const extraReducers: any = {
  // get all post when login successful
  [getHomePosts.pending.toString()]: (state: any) => {
    return { ...state, isLoading: true };
  },
  [getHomePosts.rejected.toString()]: (state: any) => {
    return { ...state, isLoading: false, loadListPostFail: true };
  },
  [getHomePosts.fulfilled.toString()]: (state: any, action: any) => {
    const temp1 = state.listPost;
    const temp2 = action.payload.data;
    const temp = [...temp1, ...temp2];
    state.listPost = temp;
    state.loadListPostFail = false;
    state.isLoading = false;
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

  // get recommend
  [getListRecommendedFollowings.pending.toString()]: (state: HomeState, action: any) => {
    return { ...state, isLoading: true };
  },
  [getListRecommendedFollowings.rejected.toString()]: (state: any, action: any) => {
    return { ...state, isLoading: false };
  },
  [getListRecommendedFollowings.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, listRecommend: action.payload, isLoading: false };
  },

  // handle like post
  [handleLike.pending.toString()]: (state: any, action: any) => {},
  [handleLike.rejected.toString()]: (state: any, action: any) => {},
  [handleLike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload.data._id) {
        post.likes.push(currentUser);
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes.push(currentUser);
        }
      }
      return post;
    });
  },

  // Handle dislike post
  [handleDislike.pending.toString()]: (state: any, action: any) => {},
  [handleDislike.rejected.toString()]: (state: any, action: any) => {},
  [handleDislike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state listPost
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload.data._id) {
        // post.likes = post.likes.filter((item: any) => item !== currentUser);
        post.likes = post.likes.filter((user: User) => {
          return user.id !== currentUser.id;
        });
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes = state.selectedPost.likes.filter((user: User) => {
            return user.id !== currentUser.id;
          });
        }
      }
      return post;
    });
  },

  // Add new comment
  [addNewComment.pending.toString()]: (state: any, action: any) => {},
  [addNewComment.rejected.toString()]: (state: any, action: any) => {},
  [addNewComment.fulfilled.toString()]: (state: any, action: any) => {
    // Update state list comment
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
    state.listComment = state.listComment.filter((comment: any) => {
      return comment._id !== deletedComment._id;
    });
  },

  // Delete comment
  [deleteComment.pending.toString()]: (state: any, action: any) => {},
  [deleteComment.rejected.toString()]: (state: any, action: any) => {},
  [deleteComment.fulfilled.toString()]: (state: any, action: any) => {
    const deletedComment = action.payload.data;
    state.listComment = state.listComment.filter((comment: any) => {
      return comment._id !== deletedComment._id;
    });
  },

  // like comment
  [likeComment.pending.toString()]: (state: any, action: any) => {},
  [likeComment.rejected.toString()]: (state: any, action: any) => {},
  [likeComment.fulfilled.toString()]: (state: any, action: any) => {
    const updatedComment = action.payload.data;
    const index = state.listComment.findIndex((cmt: any) => cmt._id === updatedComment._id)
    const newComments = [...state.listComment];
    if (index < 0) {
      newComments.push(updatedComment);
    } else {
      newComments[index] = updatedComment;
    }
    state.listComment = newComments;
  },

  // like comment
  [unlikeComment.pending.toString()]: (state: any, action: any) => {},
  [unlikeComment.rejected.toString()]: (state: any, action: any) => {},
  [unlikeComment.fulfilled.toString()]: (state: any, action: any) => {
    const updatedComment = action.payload.data;
    const index = state.listComment.findIndex((cmt: any) => cmt._id === updatedComment._id)
    const newComments = [...state.listComment];
    if (index < 0) {
      newComments.push(updatedComment);
    } else {
      newComments[index] = updatedComment;
    }
    state.listComment = newComments;
  },

  // Get user info
  [getUserById.pending.toString()]: (state: any, action: any) => {},
  [getUserById.rejected.toString()]: (state: any, action: any) => {},
  [getUserById.fulfilled.toString()]: (state: any, action: any) => {}
};
