import { createAsyncThunk } from '@reduxjs/toolkit';
import NotificationAPI from '../../../api/notification/Notification';

export const getNotifications = createAsyncThunk('notifications/getAll', async ({ id, pageIndex, pageSize }: { id: string, pageIndex: number, pageSize: number }) => {
  const response = await NotificationAPI.getNotifications(id, pageIndex, pageSize);
  return response.data;
});

export const markAsRead = createAsyncThunk('notifications/markAsRead', async (id: string) => {
  const response = await NotificationAPI.markAsRead(id);
  return response.data;
});

export const markAsReadAll = createAsyncThunk('notifications/markAsReadAll', async ({ userId, pageIndex, pageSize }: { userId: string, pageIndex: number, pageSize: number }) => {
  const response = await NotificationAPI.markAsReadAll(userId, pageIndex, pageSize);
  return response.data;
});

export const markAsUnRead = createAsyncThunk('notifications/markAsUnRead', async (id: string) => {
  const response = await NotificationAPI.markAsUnRead(id);
  return response.data;
});

export const deleteNotification = createAsyncThunk('notifications/delete', async (id: string) => {
  const response = await NotificationAPI.deleteNotification(id);
  return response.data;
});
