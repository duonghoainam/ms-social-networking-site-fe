import { getApiUrl } from '../../utils/api.util';
import axiosClient from '../AxiosClient';
import { User } from '../user/type/user.type';
class UserApi {
  getUserInfo = (userId: string): any => {
    const url = `${getApiUrl()}/user/${userId}`;
    return axiosClient.get(url, {});
  };
}

const userAPI = new UserApi();
export default userAPI;
