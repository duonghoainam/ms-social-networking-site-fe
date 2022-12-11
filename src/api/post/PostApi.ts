import { getApiUrl } from '../../utils/api.util';
import axiosClient from '../AxiosClient';
import { Post } from './type/post.type';
class PostAPI {
  // Post API
  getHomePosts = (userId: string): any => {
    const url = `${getApiUrl()}/posts/home`;
    return axiosClient.get(url, { params: { userId } });
  };

  getUserPosts = (userId: string): any => {
    const url = `${getApiUrl()}/posts/`;
    return axiosClient.get(url, { params: { userId } });
  };

  getPostById = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}`;
    return axiosClient.get(url, { params: { postId } });
  };

  createPost = (params: Post): any => {
    const url = `${getApiUrl()}/posts`;
    return axiosClient.post(url, { params });
  };

  updatePost = (postId: string, content: string, images: string): any => {
    const url = `${getApiUrl()}/posts/${postId}`;
    return axiosClient.patch(url, { params: { postId, content, images } });
  };

  deletePost = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}`;
    return axiosClient.delete(url, { params: { postId } });
  };

  likePost = (userId: string, postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/like`;
    return axiosClient.patch(url, { postId, userId });
  };

  unlikePost = (userId: string, postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/unlike`;
    return axiosClient.patch(url, { postId, userId });
  };

  // Comment API
  getPostComments = (postId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments`;
    return axiosClient.get(url, { params: { postId } });
  };

  createComment = (postId: string, userId: string, content: string, postUserId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments`;
    return axiosClient.post(url, { postId, userId, content, postUserId });
  };

  updateComment = (postId: string, commentId: string, content: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/${commentId}`;
    return axiosClient.patch(url, { params: { postId, commentId, content } });
  };

  deleteComment = (postId: string, commentId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/${commentId}`;
    return axiosClient.delete(url, { params: { commentId, postId } });
  };

  likeComment = (userId: string, postId: string, commentId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/${commentId}/like`;
    return axiosClient.get(url, { params: { commentId, userId } });
  };

  unlikeComment = (userId: string, postId: string, commentId: string): any => {
    const url = `${getApiUrl()}/posts/${postId}/comments/${commentId}/unlike`;
    return axiosClient.get(url, { params: { commentId, userId } });
  };
}

const postAPI = new PostAPI();
export default postAPI;
