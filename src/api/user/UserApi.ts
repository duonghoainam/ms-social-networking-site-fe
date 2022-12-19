import axiosClient from '../AxiosClient';
import { getApiUrl } from '../../utils/api.util';
import { ApiResponse } from '../api-response.type';
import { FollowParams } from './type/follow.params';

class UserAPI {
  getUserInfo = async (userId: string): Promise<any> => {
    const url = `${getApiUrl()}/users/${userId}/`;
    return await axiosClient.get(url, {});
  };

  updateUser = async (userId: string): Promise<any> => {
    const url = `${getApiUrl()}/users/${userId}/`;

    return await axiosClient.put(url, userId);
  };

  updateAvt = async (params: any): Promise<any> => {
    const url = `${getApiUrl()}/users/${params.userId as string}/`;

    return await axiosClient.patch(url, params);
  };

  // Follow
  getListRecommend = async (userId: string): Promise<ApiResponse> => {
    const url = `${getApiUrl()}/users/${userId}/recommend`;

    return await axiosClient.get(url);
  };

  getFollowings = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/followings`;
    return axiosClient.get(url);
  };

  getFollowers = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/followers`;
    return axiosClient.get(url, {});
  };

  handleFollow = async (params: FollowParams): Promise<ApiResponse> => {
    const url = `${getApiUrl()}/users/${params.userId}/followings`;

    return await axiosClient.patch(url, params);
  };

  // Other
  getAllPost = async (params: any): Promise<any> => {
    const url = `${getApiUrl()}/users/${params.userId as string}/posts`;

    return await axiosClient.get(url, params);
  };

  getPostsByUserId = async (params: any): Promise<any> => {
    // const url = `${URL}/posts/user/${params}`;
    // return await axiosClient.get(url, {});
  };

  getAllUsers = async (): Promise<any> => {
    const url = `${getApiUrl()}/users/`;

    return await axiosClient.get(url);
  };

  changePassword = async (params: any): Promise<any> => {
    const url = `${getApiUrl()}/users/${params.userId as string}`;

    return await axiosClient.patch(url, params);
  };
}

const userAPI = new UserAPI();

export default userAPI;
