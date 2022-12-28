/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../api/user/type/user.type';
import { extraReducers } from './userReducers';

interface UserState {
  userInfo: User
  followerList: any[]
  followingList: any[]
  posts: any[]
  comments: []
  selectedPost: any
  isShowPostDetail: boolean
  isShowPostEdit: boolean
  isLoading: boolean
}

const initialState: UserState = {
  userInfo: {} as User,
  followerList: [],
  followingList: [],
  posts: [],
  comments: [],
  selectedPost: {},
  isShowPostDetail: false,
  isShowPostEdit: false,
  isLoading: false
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedPost: (state: any, action: any): void => {
      return { ...state, selectedPost: action.payload };
    },
    setShowPostDetail: (state: any, action: any): void => {
      return { ...state, isShowPostDetail: action.payload };
    },
    setShowPostEdit: (state: any, action: any): void => {
      return { ...state, isShowPostEdit: action.payload };
    }
  },
  extraReducers
});

const { reducer: UserReducer, actions } = UserSlice;

export const { setSelectedPost, setShowPostDetail, setShowPostEdit } = actions;
export default UserReducer;
