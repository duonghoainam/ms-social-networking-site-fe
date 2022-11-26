import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

axiosClient.interceptors.request.use(async (req: any) => {
  const accessToken: string = localStorage.getItem('accessToken') ?? '';

  if (accessToken !== '') {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response?.data as boolean) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
