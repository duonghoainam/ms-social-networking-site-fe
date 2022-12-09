import axiosClient from '../AxiosClient';
import { getApiUrl } from '../../utils/api.util';
import { IMessageCrt } from '../../pages/Chat/types/IMessageCrt';
const ChatAPI = {
  getAllConversations: (id: string): any => {
    const url = getApiUrl() + `/conversation/ofMine/${id}`;
    return axiosClient.get(url);
  },
  createConversation: (params: any): any => {
    const url = getApiUrl() + '/conversation';
    return axiosClient.post(url, params);
  },
  getUserContact: (id: string): any => {
    const url = getApiUrl() + `/users/${id}/followings`;
    console.log(url);
    return axiosClient.get(url);
  },
  createMessage: (params: IMessageCrt): any => {
    const url = getApiUrl() + '/messages';
    return axiosClient.post(url, params);
  },
  getMessageInCon: (id: string, page: number): any => {
    const url = `${getApiUrl()}/messages/${id}?page=${page.toString()}`;
    return axiosClient.get(url);
  },
  getLastMessageInCon: (id: string): any => {
    const url = `${getApiUrl()}/messages/${id}/last`;
    return axiosClient.get(url);
  },
  getMembersInCon: (id: string): any => {
    const url = `${getApiUrl()}/conversation/${id}/members`;
    return axiosClient.get(url);
  },
  deleteCon: (params: any): any => {
    const url = `${getApiUrl()}/conversation`;
    return axiosClient.delete(url, { data: params });
  },
  removeUserInCon: (params: any): any => {
    const url = getApiUrl() + '/conversation/removeMember';
    return axiosClient.patch(url, params);
  },
  addUserIntoCon: (params: any): any => {
    const url = getApiUrl() + '/conversation/addMember';
    return axiosClient.patch(url, params);
  },
  reactMessage: (params: { id: string; reactBy: string }): any => {
    const url = getApiUrl() + '/messages/react';
    return axiosClient.put(url, params);
  },
  unReactMessage: (params: { id: string; reactBy: string }): any => {
    const url = getApiUrl() + '/messages/unReact';
    return axiosClient.put(url, params);
  },
  changeConName: (id: string, newName: string): any => {
    const url = `${getApiUrl()}/conversation/${id}/name`;
    return axiosClient.put(url, { id, newName });
  },
  changeConAvt: (id: string, newAvatar: string): any => {
    const url = `${getApiUrl()}/conversation/${id}/avatar`;
    return axiosClient.put(url, { id, newAvatar });
  },
  deleteMessage: (args: { id: string; sender: string }): any => {
    const url = `${getApiUrl()}/messages/${args.id}/delete`;
    return axiosClient.put(url, args);
  },
  seenAllMessages: (args: { id: string; seenBy: string }): any => {
    const url = `${getApiUrl()}/messages/seenAll`;
    return axiosClient.put(url, args);
  },
  seenMessage: (messageId: any): any => {
    const url = `${getApiUrl()}/messages/seen`;
    return axiosClient.patch(url, { messageId });
  }
};

export default ChatAPI;
