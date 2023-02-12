import {
  getUserById,
  getFollowerList,
  getFollowingList,
  getPostsByUserId,
  getPostComments,
  handleLike,
  handleDislike,
  addNewComment,
  deletePost,
  updatePost,
  userLikeComment,
  userUnlikeComment
} from './userActions';

export const extraReducers: any = {
  // getUserById
  [getUserById.pending.toString()]: (state: any) => {
    state.isLoading = true;
  },
  [getUserById.fulfilled.toString()]: (state: any, action: any) => {
    state.userInfo = action.payload.data;
    state.isLoading = false;
  },
  [getUserById.rejected.toString()]: (state: any, action: any) => {
    state.isLoading = false;
  },
  // getFollowerList
  [getFollowerList.pending.toString()]: (state: any) => {
    state.isLoading = true;
  },
  [getFollowerList.fulfilled.toString()]: (state: any, action: any) => {
    state.followerList = action.payload.data;
    state.isLoading = false;
  },
  [getFollowerList.rejected.toString()]: (state: any, action: any) => {
    state.isLoading = false;
  },

  //  getFollowingList
  [getFollowingList.pending.toString()]: (state: any) => {
    state.isLoading = true;
  },
  [getFollowingList.fulfilled.toString()]: (state: any, action: any) => {
    state.followingList = action.payload.data;
    state.isLoading = false;
  },
  [getFollowingList.rejected.toString()]: (state: any, action: any) => {
    state.isLoading = false;
  },

  // getPostsByUserId
  [getPostsByUserId.pending.toString()]: (state: any) => {
    state.isLoading = true;
  },
  [getPostsByUserId.fulfilled.toString()]: (state: any, action: any) => {
    state.posts = action.payload.data;
    state.isLoading = false;
  },
  [getPostsByUserId.rejected.toString()]: (state: any, action: any) => {
    state.isLoading = false;
  },

  // get all comment of post
  [getPostComments.fulfilled.toString()]: (state: any, action: any) => {
    return { ...state, comments: action.payload.data };
  },

  // handle like post
  [handleLike.pending.toString()]: (state: any, action: any) => { },
  [handleLike.rejected.toString()]: (state: any, action: any) => { },
  [handleLike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state posts
    state.posts = state.posts.map((post: any) => {
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
  [handleDislike.pending.toString()]: (state: any, action: any) => { },
  [handleDislike.rejected.toString()]: (state: any, action: any) => { },
  [handleDislike.fulfilled.toString()]: (state: any, action: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
    // Update state posts
    state.posts = state.posts.map((post: any) => {
      if (post._id === action.payload.data._id) {
        // post.likes = post.likes.filter((item: any) => item !== currentUser);
        post.likes = post.likes.filter((user: any) => { return user.id !== currentUser.id });
        // Update state selectedPost if like in PostComment
        if (Boolean(state.selectedPost._id)) {
          state.selectedPost.likes = state.selectedPost.likes.filter((user: any) => { return user.id !== currentUser.id });
        }
      }
      return post;
    });
  },

  // Add new comment
  [addNewComment.pending.toString()]: (state: any, action: any) => { },
  [addNewComment.rejected.toString()]: (state: any, action: any) => { },
  [addNewComment.fulfilled.toString()]: (state: any, action: any) => {
    // Update state list comment
    state.comments.push(action.payload.data);
    // Update state posts
    state.posts = state.posts.map((post: any) => {
      if (post._id === action.payload.data.postId) {
        post.comments.push(action.payload.data._id);
      }
      return post;
    });
  },
  // Update post
  [updatePost.pending.toString()]: (state: any) => { },
  [updatePost.fulfilled.toString()]: (state: any, action: any) => {
    state.posts = state.posts.map((post: any) => {
      if (post._id === action.payload.data._id) post = action.payload.data
      return post
    })
  },
  [updatePost.rejected.toString()]: (state: any, action: any) => { },

  // Delete post
  [deletePost.pending.toString()]: (state: any) => { },
  [deletePost.fulfilled.toString()]: (state: any, action: any) => {
    state.posts = state.posts.filter((post: any) => post._id !== action.payload.data._id)
  },
  [deletePost.rejected.toString()]: (state: any, action: any) => { },

  // like comment
  [userLikeComment.pending.toString()]: (state: any, action: any) => {},
  [userLikeComment.rejected.toString()]: (state: any, action: any) => {},
  [userLikeComment.fulfilled.toString()]: (state: any, action: any) => {
    const updatedComment = action.payload.data;
    const index = state.comments.findIndex((cmt: any) => cmt._id === updatedComment._id)
    const newComments = [...state.comments];
    if (index < 0) {
      newComments.push(updatedComment);
    } else {
      newComments[index] = updatedComment;
    }
    state.comments = newComments;
  },

  // like comment
  [userUnlikeComment.pending.toString()]: (state: any, action: any) => {},
  [userUnlikeComment.rejected.toString()]: (state: any, action: any) => {},
  [userUnlikeComment.fulfilled.toString()]: (state: any, action: any) => {
    const updatedComment = action.payload.data;
    const index = state.comments.findIndex((cmt: any) => cmt._id === updatedComment._id)
    const newComments = [...state.comments];
    if (index < 0) {
      newComments.push(updatedComment);
    } else {
      newComments[index] = updatedComment;
    }
    state.comments = newComments;
  }
};
