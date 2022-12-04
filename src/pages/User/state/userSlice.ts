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
  isLoading: boolean;
}

const initialState: UserState = {
  activeId: '',
  userInfo: {} as User,
  followerList: [],
  followingList: [],
  posts: [],
  isLoading: false
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addActiveId: (state: any, action: any) => {
      state.activeId = action.payload;
    }
  },
  extraReducers
});

const { reducer: userReducer, actions } = UserSlice;

export const { addActiveId } = actions;
export default userReducer;
