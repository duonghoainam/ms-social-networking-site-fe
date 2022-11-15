import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import NotificationAPI from '../../api/NotificationApi';
import postAPI from '../../api/PostApi';

// hàm lấy tất cả bài post khi vào trang chủ
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const listPosts = await postAPI.getPosts();
  return listPosts;
});

// hàm lấy tất cả comment của bài post
export const getCommentsByPostID = createAsyncThunk('post/getComments', async (params) => {
  const listComment = await postAPI.getCommentByPostID(params);
  return listComment;
});

// hàm xử lý like hay bỏ like bài post

export const handleLike = createAsyncThunk('post/Like', async (params) => {
  await postAPI.likePost(params);
  return params;
});

export const handleUnLike = createAsyncThunk('post/UnLike', async (params) => {
  await postAPI.unLikePost(params);
  return params;
});

// hàm lấy danh sách gợi ý kết bạn
export const getListRecommendFriends = createAsyncThunk(
  'home/getListRecommendFriends',
  async () => {
    const listRecommend = await postAPI.recommendFriends();
    return listRecommend;
  }
);

// hàm add comment
export const addNewComment = createAsyncThunk('home/addNewComments', async (params) => {
  const listRecommend = await postAPI.addComment(params);
  return listRecommend;
});

// like or unlike comment
export const likeOrUnlikeCmt = createAsyncThunk('comment/likeOrUnlikeCmt', async (params) => {
  const listRecommend = await postAPI.handleLikeCmt(params);
  return listRecommend;
});

// editcomment
export const editComment = createAsyncThunk('comment/edit', async (params) => {
  const listRecommend = await postAPI.editCmt(params);
  return listRecommend;
});

// delete comment
export const deleteComment = createAsyncThunk('comment/delete', async (params) => {
  const listRecommend = await postAPI.deleteCmt(params);
  return listRecommend;
});

// unfollow
export const unFollow = createAsyncThunk('user/unfollow', async (params) => {
  await postAPI.unnFollowFriends(params);
});
// unfollow
export const follow = createAsyncThunk('user/follow', async (params) => {
  await postAPI.followFriends(params);
});

// getListLike
export const getListUser = createAsyncThunk('user/getlistLike', async (params) => {
  return await postAPI.getlistLike(params);
});

export const createPost = createAsyncThunk('post/createNew', async (args, thunkAPI) => {
  try {
    const response = await postAPI.createNewPost(args);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async (params) => {
  const response = await postAPI.updatePost(params);
  return response;
});

export const deletePost = createAsyncThunk('post/deletePost', async (params) => {
  console.log(params);
  const response = await postAPI.deletePost(params);
  console.log(response);
  return response;
});

export const getPostById = createAsyncThunk('post/getPostById', async (params) => {
  const post = await postAPI.getPostById(params);
  console.log(post);
  return post;
});

export const getNotification = createAsyncThunk('notification/get', async () => {
  const listNotification = await NotificationAPI.getNotification();
  return listNotification;
});

export const createNotification = createAsyncThunk('notification/create', async (params) => {
  return await NotificationAPI.createNotification(params);
});

export const seenNotification = createAsyncThunk('notification/seen', async (params) => {
  const Notification = await NotificationAPI.seenNotification(params);
  return Notification;
});

export const seenAllNotification = createAsyncThunk('notification/seenAll', async () => {
  const Notification = await NotificationAPI.seenAllNotification();
  return Notification;
});

const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    replingCmt: {
      CmtID: null,
      CmtUserName: '',
      CmtUserId: ''
    },
    editingCmt: {},
    post: {},
    listLikeCmt: {
      isShowAlllikeModal: false,
      isLoad: true,
      listUsers: []
    },
    listNotification: [],
    isLoadingAddCmt: false,
    likepost: false,
    listPosts: [],
    listComment: [],
    listRecommend: [],
    activePostId: '',
    isShowDetail: false,
    isShowReportModal: false,

    isLoading: false,
    isLoadCmt: false,
    loadListPostFail: false
  },
  reducers: {
    ShowDetail: (state, action) => {
      state.isShowDetail = true;
      state.activePostId = action.payload;
    },
    HideDetailReducer: (state, action) => {
      state.isShowDetail = false;
      state.activePostId = '';
      state.post = {};
    },
    ShowReportModal: (state, action) => {
      state.isShowReportModal = true;
    },
    HideReportModal: (state, action) => {
      state.isShowReportModal = false;
    },
    ShowAllLikesModal: (state: any, action) => {
      state.isShowAlllikeModal = true;
    },
    HideAllLikesModal: (state: any, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: false,
        listUsers: []
      };
    },
    SetReplyCmd: (state, action) => {
      state.replingCmt.CmtID = action.payload.cmtId;
      state.replingCmt.CmtUserName = action.payload.userName;
      state.replingCmt.CmtUserId = action.payload.userId;
    },
    CancelReplyCmd: (state, action) => {
      state.replingCmt = {
        CmtID: null,
        CmtUserName: '',
        CmtUserId: ''
      };
    },

    editCmt: (state, action) => {
      state.editingCmt = action.payload;
    }
  },
  extraReducers: {
    // get all post when login successful
    [getPosts.pending.toString()]: (state) => {
      state.isLoading = true;
      state.listNotification = [];
    },
    [getPosts.rejected.toString()]: (state) => {
      console.log('Lỗi không lấy được post');
      state.isLoading = false;
      state.loadListPostFail = true;
    },
    [getPosts.fulfilled.toString()]: (state, action) => {
      state.listPosts = action.payload.posts;
      state.isLoading = false;
      state.loadListPostFail = false;
    },
    // get all comment of post
    [getCommentsByPostID.pending.toString()]: (state, action) => {
      state.isLoadCmt = true;
    },
    [getCommentsByPostID.rejected.toString()]: (state, action) => {
      state.isLoadCmt = false;
    },
    [getCommentsByPostID.fulfilled.toString()]: (state, action) => {
      state.listComment = action.payload.cmts;
      state.isLoadCmt = false;
    },

    // handlelike
    [handleLike.pending.toString()]: (state, action) => {
      console.log('Đang like');
    },
    [handleLike.rejected.toString()]: (state, action) => {
      console.log('like thất bại');
    },
    [handleLike.fulfilled.toString()]: (state, action) => {
      const loginId = JSON.parse(localStorage.getItem('login') ?? '');
      state.listPosts = state.listPosts.map((post: any) => {
        if (post._id === action.payload) {
          post.likes.push(loginId._id);
        }
        return post;
      });
    },

    [handleUnLike.fulfilled.toString()]: (state, action) => {
      const loginId = JSON.parse(localStorage.getItem('login') ?? '');
      state.listPosts = state.listPosts.map((post: any) => {
        if (post._id === action.payload) {
          post.likes = post.likes.filter((item: any) => {
            return item !== loginId._id;
          });
        }
        return post;
      });
    },

    // get list recommend frieds
    [getListRecommendFriends.pending.toString()]: (state, action) => {},
    [getListRecommendFriends.rejected.toString()]: (state, action) => {},
    [getListRecommendFriends.fulfilled.toString()]: (state, action) => {
      state.listRecommend = action.payload.relateUser;
    },

    // create comment
    [addNewComment.pending.toString()]: (state, action) => {
      state.isLoadingAddCmt = true;
    },
    [addNewComment.rejected.toString()]: (state, action) => {
      state.isLoadingAddCmt = false;
    },
    [addNewComment.fulfilled.toString()]: (state, action) => {
      state.isLoadingAddCmt = false;
      state.replingCmt = {
        CmtID: null,
        CmtUserName: ''
      };
      // state.listComment = action.payload.newComment;
    },

    [likeOrUnlikeCmt.pending.toString()]: (state, action) => {},
    [likeOrUnlikeCmt.rejected.toString()]: (state, action) => {},
    [likeOrUnlikeCmt.fulfilled.toString()]: (state, action) => {},

    // edit comment
    [editComment.pending.toString()]: (state, action) => {},
    [editComment.rejected.toString()]: (state, action) => {},
    [editComment.fulfilled.toString()]: (state, action) => {},

    [deleteComment.pending.toString()]: (state, action) => {},
    [deleteComment.rejected.toString()]: (state, action) => {
      console.log('xóa thất bại');
    },
    [deleteComment.fulfilled.toString()]: (state, action) => {
      console.log('Xóa thành công');
    },

    // unfollow
    // delete comment
    [unFollow.pending.toString()]: (state, action) => {},
    [unFollow.rejected.toString()]: (state, action) => {
      console.log('unfollow thất bại');
    },
    [unFollow.fulfilled.toString()]: (state, action) => {
      console.log('Unfollow thành công');
      state.isShowReportModal = false;
    },
    // get post by id

    [getPostById.pending.toString()]: (state, action) => {},
    [getPostById.rejected.toString()]: (state, action) => {},
    [getPostById.fulfilled.toString()]: (state, action) => {
      console.log(action.payload.post[0]);
      state.post = action.payload.post[0];
    },

    // get list notification
    [getNotification.pending.toString()]: (state, action) => {},
    [getNotification.rejected.toString()]: (state, action) => {},
    [getNotification.fulfilled.toString()]: (state, action) => {
      state.listNotification = action.payload.notifications;
    },

    // create notification
    [createNotification.pending.toString()]: (state, action) => {},
    [createNotification.rejected.toString()]: (state, action) => {},
    [createNotification.fulfilled.toString()]: (state, action) => {
      // state.listNotification = action.payload;
      console.log('Tạo notification thành công');
    },

    [seenNotification.fulfilled.toString()]: (state, action) => {
      // console.log(action.payload);
      // xử lý đã xem tin nhắn
      state.listNotification = state.listNotification.map((item: any, index: any) => {
        if (item._id === action.payload.seenNoti._id) {
          item.isSeen = true;
        }
        return item;
      });
    },

    [seenAllNotification.fulfilled.toString()]: (state, action) => {
      state.listNotification = state.listNotification.map((item: any, index: any) => {
        item.isSeen = true;
        return item;
      });
    },

    [follow.fulfilled.toString()]: (state, action) => {
      // state.isShowReportModal = false;
    },
    [getListUser.pending.toString()]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        isLoad: true,
        listUsers: []
      };
    },
    [getListUser.fulfilled.toString()]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        listUsers: action.payload.users
      };
    },

    [getListUser.fulfilled.toString()]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        isLoad: false,
        listUsers: action.payload.users
      };
    }
  }
});

// Action creators are generated for each case reducer function
const { reducer: HomeReducer, actions } = HomeSlice;
export const {
  ShowDetail,
  HideDetailReducer,
  ShowReportModal,
  HideReportModal,
  ShowAllLikesModal,
  HideAllLikesModal,
  SetReplyCmd,
  CancelReplyCmd,
  editCmt
} = actions;

export default HomeReducer;
