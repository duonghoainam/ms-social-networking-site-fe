import { getUserById, getFollowerList, getFollowingList, getPostsByUserId } from './userActions';

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
  }
};
