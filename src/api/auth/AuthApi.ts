import { getApiUrl } from '../../utils/api.util';
import { ApiResponse } from '../api-response.type';
import axiosClient from '../AxiosClient';
import { LoginParams } from './type/login.type';
import { RegisterParams } from './type/register.type';

class AuthAPI {
  login = async (params: LoginParams): Promise<ApiResponse> => {
    const url = getApiUrl() + '/api/users/login';
    return await axiosClient.post(url, params);
  };

  createAccount = async (params: RegisterParams): Promise<ApiResponse> => {
    const url = getApiUrl() + '/api/users/register';
    return await axiosClient.post(url, params);
  };

  logout = async (params: any): Promise<ApiResponse> => {
    const url = getApiUrl() + '/auth/logout';
    return await axiosClient.post(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
