import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../../../pages/Chat/types/INotification.Type';
import { extraReducers } from './notificationReducer';

export interface NotificationState {
  notifications: INotification[]
  loading: false
  error: false
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: false
};

const NotificationSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addNotification: (state: NotificationState, action: any) => {
      state.loading = false;
      state.error = false;
      const index = state.notifications.findIndex(
        (noti: INotification) => noti._id === action.payload._id
      );
      if (index === -1) state.notifications.unshift(action.payload);
      else state.notifications[index] = action.payload;
    },
    updateNotification: (state: NotificationState, action: any) => {
      state.loading = false;
      state.error = false;
      const conIndex = state.notifications.findIndex(
        (noti: INotification) => noti._id === action.payload._id
      );
      state.notifications[conIndex] = action.payload;
    },
    deleteNotification: (state: NotificationState, action: any) => {
      state.loading = false;
      state.error = false;
      const newNotifications = state.notifications.filter(
        (noti: INotification) => noti._id !== action.payload._id
      );
      state.notifications = newNotifications;
    }
  },
  extraReducers
});

const { reducer: NotificationReducer, actions } = NotificationSlice;

export const {
  addNotification,
  updateNotification,
  deleteNotification
} = actions;

export default NotificationReducer;
