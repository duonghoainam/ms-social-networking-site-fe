/* eslint-disable */
import {
  getPostComments,
  getListRecommendFriends,
  getPosts,
  handleLike,
  handleUnLike,
} from './homeActions';

export const extraReducers: any = {
  // get all post when login successful
  [getPosts.pending.toString()]: (state: any) => {
    return {...state, isLoading: true}
  },
  [getPosts.rejected.toString()]: (state: any) => {
    return {...state, isLoading: false, loadListPostFail: true}
  },
  [getPosts.fulfilled.toString()]: (state: any, action: any) => {
    return {...state, listPost: action.payload.posts, loadListPostFail: false, isLoading: false};
  },
  // get all comment of post
  [getPostComments.pending.toString()]: (state: any, action: any) => {
    return {...state, isLoadComment: true};
  },
  [getPostComments.rejected.toString()]: (state: any, action: any) => {
    return {...state, isLoadComment: false};
  },
  [getPostComments.fulfilled.toString()]: (state: any, action: any) => {
    return {...state, listComment: action.payload.comments, isLoadComment: false};
  },

  // // handle like
  // [handleLike.pending.toString()]: (state: any, action: any) => {
  //   console.log('Đang like');
  // },
  // [handleLike.rejected.toString()]: (state: any, action: any) => {
  //   console.log('like thất bại');
  // },
  // [handleLike.fulfilled.toString()]: (state: any, action: any) => {
  //   const loginId = JSON.parse(localStorage.getItem('login') ?? '');
  //   state.listPost = state.listPost.map((post: any) => {
  //     if (post._id === action.payload) {
  //       post.likes.push(loginId._id);
  //     }
  //     return post;
  //   });
  // },

  // [handleUnLike.fulfilled.toString()]: (state: any, action: any) => {
  //   const loginId = JSON.parse(localStorage.getItem('login') ?? '');
  //   state.listPost = state.listPost.map((post: any) => {
  //     if (post._id === action.payload) {
  //       post.likes = post.likes.filter((item: any) => {
  //         return item !== loginId._id;
  //       });
  //     }
  //     return post;
  //   });
  // },

  // // get list recommend friends
  // [getListRecommendFriends.pending.toString()]: (state: any, action: any) => {},
  // [getListRecommendFriends.rejected.toString()]: (state: any, action: any) => {},
  // [getListRecommendFriends.fulfilled.toString()]: (state: any, action: any) => {
  //   state.listRecommend = action.payload.relateUser;
  // }
};
