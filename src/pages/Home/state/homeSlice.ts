/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../api/post/type/post.type';
import { User } from '../../../api/user/type/user.type';
import { extraReducers } from './homeReducers';

export interface HomeState {
  latitude: Number; 
  longitude: Number;
  weather: object;
  listPost: any[];
  listComment: any[];
  listRecommend: User[];
  isLoadComment: boolean;
  isShowPostDetail: boolean;
  selectedPost: Post;
  isLoading: boolean;
  loadListPostFail: boolean;
}
const initialState: HomeState = {
  latitude: 0,
  longitude: 0,
  weather: {},
  listPost: [],
  listComment: [],
  listRecommend: [],
  isLoading: true,
  selectedPost: {} as Post,
  isShowPostDetail: false,
  isLoadComment: true,
  loadListPostFail: false
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedPost: (state: any, action: any): void => {
      return { ...state, selectedPost: action.payload };
    },
    setShowPostDetail: (state: any, action: any): void => {
      return { ...state, isShowPostDetail: action.payload };
    },
    setLat: (state: any, action: any): void => {
      return { ...state, latitude: action.payload };
    },
    setLon: (state: any, action: any): void => {
      return { ...state, longitude: action.payload };
    },
    setWeather: (state: any, action: any): void => {
      console.log('weathherererererr', action.payload);
      return { ...state, weather: action.payload };
    },  
  },
  extraReducers
});
// Action creators are generated for each case reducer function
const { reducer: HomeReducer, actions } = HomeSlice;

export const { setSelectedPost, setShowPostDetail, setLat, setLon, setWeather } = actions;

export default HomeReducer;
