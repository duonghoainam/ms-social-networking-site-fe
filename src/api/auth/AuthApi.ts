import { getApiUrl } from '../../utils/api.util';
import { ApiResponse } from '../api-response.type';
import axiosClient from '../AxiosClient';
import { RegisterParams } from './type/register.type';

class AuthAPI {
  getAccount = async (params: any): Promise<ApiResponse> => {
    const url = getApiUrl() + '/auth/login';
    return await axiosClient.post(url, params);
  };

  createAccount = async (params: RegisterParams): Promise<ApiResponse> => {
    const url = getApiUrl() + '/auth/register';
    return await axiosClient.post(url, params);
  };

  logout = async (params: any): Promise<ApiResponse> => {
    const url = getApiUrl() + '/auth/logout';
    return await axiosClient.post(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
