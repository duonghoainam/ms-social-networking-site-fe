import { getApiUrl } from '../../utils/api.util';
import axiosClient from '../AxiosClient';
// import { User } from '../user/type/user.type';
class UserApi {
  getUserInfo = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}`;
    return axiosClient.get(url, {});
  };

  getFollowings = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/followings`;
    return axiosClient.get(url, {});
  };

  getFollowers = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/followers`;
    return axiosClient.get(url, {});
  };

  getAvailableUsers = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/recommend`;
    return axiosClient.get(url, {});
  };

  editFollowing = (userId: string): any => {
    const url = `${getApiUrl()}/users/${userId}/followings`;
    return axiosClient.patch(url, {});
  }
}

const userAPI = new UserApi();
export default userAPI;
