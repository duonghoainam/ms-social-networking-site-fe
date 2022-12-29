/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../api/user/type/user.type';
import { extraReducers } from './userReducers';

interface UserState {
  userInfo: User;
  followerList: any[];
  followingList: any[];
  posts: any[];
  comments: [];
  selectedPost: any;
  isShowPostDetail: false;
  isLoading: boolean;
}

const initialState: UserState = {
  userInfo: {} as User,
  followerList: [],
  followingList: [],
  posts: [],
  comments: [],
  selectedPost: {},
  isShowPostDetail: false,
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
    }
  },
  extraReducers
});

const { reducer: UserReducer, actions } = UserSlice;

export const { setSelectedPost, setShowPostDetail } = actions;
export default UserReducer;
