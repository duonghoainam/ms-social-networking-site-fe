import { createSlice } from '@reduxjs/toolkit';
import { reducers, extraReducers } from './homeReducers';

interface HomeState {
  listPosts: any[];
  isLoading: boolean;
  loadListPostFail: boolean;
}
const initialState: HomeState = {
  listPosts: [{}],
  isLoading: false,
  loadListPostFail: false
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers,
  extraReducers
});

// Action creators are generated for each case reducer function
const { reducer: HomeReducer } = HomeSlice;

export default HomeReducer;
