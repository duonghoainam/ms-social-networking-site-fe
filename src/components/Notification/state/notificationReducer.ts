import { deleteNotification, getNotifications, markAsRead, markAsUnRead, markAsReadAll } from './notificationAction';
export const extraReducers = {
  [getNotifications.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [getNotifications.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.notifications = action.payload;
    state.error = false;
  },
  [getNotifications.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [markAsRead.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [markAsRead.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.notifications.unshift(action.payload);
  },
  [markAsRead.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [markAsReadAll.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [markAsReadAll.fulfilled.toString()]: (state: any, action: any) => {
    console.log('accccc', action.payload)
    state.loading = false;
    state.notifications = action.payload;
    state.error = false;
  },
  [markAsReadAll.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [markAsUnRead.pending.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [markAsUnRead.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
    state.userFollowing = action.payload;
  },
  [markAsUnRead.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  },
  [deleteNotification.pending.toString()]: (state: any, action: any) => {
    state.loading = true;
    state.error = false;
  },
  [deleteNotification.fulfilled.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = false;
  },
  [deleteNotification.rejected.toString()]: (state: any, action: any) => {
    state.loading = false;
    state.error = true;
  }
};
