import { getApiUrl } from '../../utils/api.util';
import axiosClient from '../AxiosClient';
import { Post } from './type/post.type';
class PostAPI {
  // Post API
  getHomePosts = (userId: string): any => {
    const url = `${getApiUrl()}/posts/home`;
    return axiosClient.get(url, { params: { userId } });
  };

  getPostById = (postId: string): any => {
    const url = `${getApiUrl()}/posts/post`;
    return axiosClient.get(url, { params: { postId } });
  };

  getPostsByUserId = (userId: string): any => {
    const url = `${getApiUrl()}/posts/user`;
    return axiosClient.get(url, { params: { userId } });
  };

  likePost = (userId: string, postId: string): any => {
    const url = `${getApiUrl()}/posts/post/like`;
    return axiosClient.patch(url, { postId, userId });
  };

  unlikePost = (userId: string, postId: string): any => {
    const url = `${getApiUrl()}/posts/post/unlike`;
    return axiosClient.patch(url, { postId, userId });
  };

  createPost = (params: Post): any => {
    const url = `${getApiUrl()}/posts`;
    return axiosClient.post(url, { params });
  };

  updatePost = (postId: string, content: string, images: string): any => {
    const url = `${getApiUrl()}/posts`;
    return axiosClient.patch(url, { params: { postId, content, images } });
  };

  deletePost = (postId: string): any => {
    const url = `${getApiUrl()}/posts`;
    return axiosClient.delete(url, { params: { postId } });
  };

  // Comment API
  getComments = (postId: string): any => {
    const url = `${getApiUrl()}/comments/`;
    return axiosClient.get(url, { params: { postId } });
  };

  createComment = (postId: string, userId: string, content: string, postUserId: string): any => {
    const url = `${getApiUrl()}/comments/`;
    return axiosClient.post(url, { postId, userId, content, postUserId });
  };

  updateComment = (commentId: string, content: string): any => {
    const url = `${getApiUrl()}/comments/`;
    return axiosClient.patch(url, { params: { commentId, content } });
  };

  deleteComment = (commentId: string, postId: string): any => {
    const url = `${getApiUrl()}/comments/`;
    return axiosClient.delete(url, { params: { commentId, postId } });
  };

  reactComment = (commentId: string, userId: string): any => {
    const url = `${getApiUrl()}/comments/react`;
    return axiosClient.get(url, { params: { commentId, userId } });
  };
}

const postAPI = new PostAPI();
export default postAPI;
