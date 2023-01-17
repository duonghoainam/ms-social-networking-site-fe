import axiosClient from '../AxiosClient';
import { getApiUrl } from '../../utils/api.util';
const NotificationAPI = {
  // get all conversations of a user
  getNotifications: (id: string, pageIndex: number, pageSize: number): any => {
    const url = `${getApiUrl()}/notifications?userId=${id}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  // create a conversation for a user
  markAsRead: (id: string): any => {
    const url = `${getApiUrl()}/notifications/${id}/markAsRead`;
    return axiosClient.post(url);
  },
  markAsReadAll: (userId: string, pageIndex: number, pageSize: number): any => {
    const url = `${getApiUrl()}/notifications/markAsReadAll?userId=${userId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return axiosClient.patch(url);
  },
  markAsUnRead: (id: string): any => {
    const url = `${getApiUrl()}/notifications/${id}/markAsUnread`;
    return axiosClient.patch(url);
  },
  deleteNotification: (id: string): any => {
    const url = `${getApiUrl()}/notifications/${id}`;
    return axiosClient.delete(url);
  }
};

export default NotificationAPI;
