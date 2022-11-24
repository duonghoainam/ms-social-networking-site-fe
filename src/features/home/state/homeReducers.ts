/* eslint-disable */
import {
  getCommentsByPostID,
  getListRecommendFriends,
  getPosts,
  handleLike,
  handleUnLike,
  hidePostDetail,
  showPostDetail,
  showReportModal
} from './homeActions';
export const reducers: any = {
  showPostDetail,
  hidePostDetail,
  showReportModal,
}
export const extraReducers: any = {
  // get all post when login successful
  [getPosts.pending.toString()]: (state: any) => {
    return {...state, isLoading: true}
  },
  [getPosts.rejected.toString()]: (state: any) => {
    return {...state, isLoading: false, loadListPostFail: true}
  },
  [getPosts.fulfilled.toString()]: (state: any, action: any) => {
    return {...state, listPosts: action.payload.posts, loadListPostFail: false, isLoading: false};
  },
  // get all comment of post
  // [getCommentsByPostID.pending.toString()]: (state: any, action: any) => {
  //   state.isLoadCmt = true;
  // },
  // [getCommentsByPostID.rejected.toString()]: (state: any, action: any) => {
  //   state.isLoadCmt = false;
  // },
  // [getCommentsByPostID.fulfilled.toString()]: (state: any, action: any) => {
  //   state.listComment = action.payload.comments;
  //   state.isLoadCmt = false;
  // },

  // // handle like
  // [handleLike.pending.toString()]: (state: any, action: any) => {
  //   console.log('Đang like');
  // },
  // [handleLike.rejected.toString()]: (state: any, action: any) => {
  //   console.log('like thất bại');
  // },
  // [handleLike.fulfilled.toString()]: (state: any, action: any) => {
  //   const loginId = JSON.parse(localStorage.getItem('login') ?? '');
  //   state.listPosts = state.listPosts.map((post: any) => {
  //     if (post._id === action.payload) {
  //       post.likes.push(loginId._id);
  //     }
  //     return post;
  //   });
  // },

  // [handleUnLike.fulfilled.toString()]: (state: any, action: any) => {
  //   const loginId = JSON.parse(localStorage.getItem('login') ?? '');
  //   state.listPosts = state.listPosts.map((post: any) => {
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
