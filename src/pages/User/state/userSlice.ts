/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../api/user/type/user.type';
import { extraReducers } from './userReducers';

interface UserState {
  activeId: string;
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
  activeId: '',
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
    addActiveId: (state: any, action: any) => {
      state.activeId = action.payload;
    },
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

export const { addActiveId, setSelectedPost, setShowPostDetail } = actions;
export default UserReducer;
