import {
  getComments,
  getPosts,
  handleLike,
  handleUnLike,
  addNewComment
} from './homeActions';

export const extraReducers: any = {
  // get all post when login successful
  [getPosts.pending.toString()]: (state: any) => {
    return { ...state, isLoading: true }
  },
  [getPosts.rejected.toString()]: (state: any) => {
    return { ...state, isLoading: false, loadListPostFail: true }
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
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        post.likes.push(currentUser._id);
        if (Boolean(state.selectedPost._id)) {
          const tempState = state.selectedPost;
          tempState.likes.push(currentUser._id)
          state.selectedPost = tempState
        }
      }
      return post;
    })
    console.log('handleLike fulfilled')
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
    state.listPost = state.listPost.map((post: any) => {
      if (post._id === action.payload) {
        post.likes = post.likes.filter((item: any) => {
          return item !== currentUser._id;
        });
        if (Boolean(state.selectedPost._id)) {
          const tempState = state.selectedPost;
          tempState.likes = tempState.likes.filter((item: any) => item !== currentUser._id)
          state.selectedPost = tempState
        }
      }
      return post;
    })
    console.log('handleUnLike fulfilled');
  },
  [addNewComment.pending.toString()]: (state: any, action: any) => {},
  [addNewComment.rejected.toString()]: (state: any, action: any) => {},
  [addNewComment.fulfilled.toString()]: (state: any, action: any) => {}
};
