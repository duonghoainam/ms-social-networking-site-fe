import axiosClient from '../AxiosClient';
import { getApiUrl } from '../../utils/api.util';
import { IMessageCrt } from '../../pages/Chat/types/IMessageCrt';
const ChatAPI = {
  // get all conversations of a user
  getAllConversations: (id: string): any => {
    const url = `${getApiUrl()}/conversations?userId=${id}`;
    return axiosClient.get(url);
  },
  // create a conversation for a user
  createConversation: (params: any): any => {
    const url = `${getApiUrl()}/conversations`;
    return axiosClient.post(url, params);
  },
  getUserContact: (id: string): any => {
    const url = `${getApiUrl()}/users/${id}/followings`;
    return axiosClient.get(url);
  },
  createMessage: (params: IMessageCrt): any => {
    const url = `${getApiUrl()}/messages`;
    return axiosClient.post(url, params);
  },
  getMessageInCon: (id: string, page: number): any => {
    const url = `${getApiUrl()}/messages?conversationId=${id}&&page=${page.toString()}`;
    return axiosClient.get(url);
  },
  getLastMessageInCon: (id: string): any => {
    const url = `${getApiUrl()}/messages/LastMessage?conversationId=${id}`;
    return axiosClient.get(url);
  },
  getMembersInCon: (id: string): any => {
    const url = `${getApiUrl()}/conversations/${id}/members`;
    return axiosClient.get(url);
  },
  deleteCon: (params: any): any => {
    const url = `${getApiUrl()}/conversations`;
    return axiosClient.delete(url, { data: params });
  },
  removeUserInCon: (params: any): any => {
    const url = getApiUrl() + '/conversations/removeMember';
    return axiosClient.patch(url, params);
  },
  addUserIntoCon: (params: any): any => {
    const url = getApiUrl() + '/conversations/addMember';
    return axiosClient.patch(url, params);
  },
  reactMessage: (params: { id: string; reactBy: string }): any => {
    const url = getApiUrl() + '/messages/react';
    return axiosClient.patch(url, params);
  },
  unReactMessage: (params: { id: string; reactBy: string }): any => {
    const url = getApiUrl() + '/messages/unReact';
    return axiosClient.patch(url, params);
  },
  changeConName: (id: string, newName: string): any => {
    const url = `${getApiUrl()}/conversations/${id}/name`;
    return axiosClient.patch(url, { id, newName });
  },
  changeConAvt: (id: string, newAvatar: string): any => {
    const url = `${getApiUrl()}/conversations/${id}/avatar`;
    return axiosClient.patch(url, { id, newAvatar });
  },
  deleteMessage: (args: { id: string; sender: string }): any => {
    const url = `${getApiUrl()}/messages/${args.id}/delete`;
    return axiosClient.patch(url, args);
  },
  seenAllMessages: (args: { id: string; seenBy: string }): any => {
    const url = `${getApiUrl()}/messages/seenAll`;
    return axiosClient.patch(url, args);
  },
  seenMessage: (messageId: any): any => {
    const url = `${getApiUrl()}/messages/seen`;
    return axiosClient.patch(url, { messageId });
  }
};

export default ChatAPI;
