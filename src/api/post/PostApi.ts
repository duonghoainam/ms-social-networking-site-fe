import { getApiUrl } from '../../utils/api.util';
import axiosClient from '../AxiosClient';
class PostAPI {
  getPosts = (): any => {
    const url = `${getApiUrl()}/posts`;
    return axiosClient.get(url, {});
  };

  getPostById = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}`;
    return axiosClient.get(url, {});
  };

  getPostComments = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/`;
    return axiosClient.get(url, {});
  };

  likePost = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/like`;
    return axiosClient.patch(url, {});
  };

  unLikePost = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/unlike`;
    return axiosClient.patch(url, {});
  };

  recommendFriends = (): any => {
    const url = getApiUrl() + '/home/relate';
    return axiosClient.get(url, {});
  };

  addComment = (postId: string, params: any): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/`;

    const content = params.content;
    return axiosClient.post(url, { content });
  };

  // handleLikeCmt = (params: any): any => {
  //   const url = getApiUrl() + '/comments/ul/' + params;

  //   return axiosClient.put(url, {});
  // };

  // deleteCmt = (params: any): any => {
  //   const url = getApiUrl() + '/comments/' + params.CmtId;

  //   return axiosClient.delete(url, {});
  // };

  // editCmt = (params: any): any => {
  //   const url = getApiUrl() + '/comments/' + params.CmtId;
  //   return axiosClient.put(url, {});
  // };

  // unnFollowFriends = (params: any): any => {
  //   const url = getApiUrl() + '/user/user/' + params + '/unfollow';
  //   return axiosClient.patch(url, { params });
  // };

  // followFriends = (params: any): any => {
  //   const url = getApiUrl() + '/user/user/' + params + '/follow';
  //   return axiosClient.patch(url, { params });
  // };

  // getlistLike = (params: any): any => {
  //   const url = getApiUrl() + '/user/users';
  //   return axiosClient.post(url, params);
  // };

  // createNewPost = (params: any): any => {
  //   const url = getApiUrl() + '/posts/createPost';
  //   return axiosClient.post(url, params);
  // };

  // updatePost = (params: any): any => {
  //   const url = getApiUrl() + '/posts/updatePost';
  //   return axiosClient.patch(url, params);
  // };

  // deletePost = (params: any): any => {
  //   const url = getApiUrl() + '/posts/delete/' + params;
  //   return axiosClient.delete(url, {});
  // };
}

const postAPI = new PostAPI();
export default postAPI;
