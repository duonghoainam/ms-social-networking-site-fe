// import queryString from 'query-string';
import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
  // paramsSerializer: (params: any) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (req: any) => {
  let accessToken: string = localStorage.getItem('accessToken') ?? '';
  accessToken = JSON.parse(accessToken);

  if (accessToken !== '') {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  // const user = jwt_decode(accessToken.accessToken);

  // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  // console.log(isExpired);

  // if (!isExpired) return req;

  // const response = await axios.post(`/resfresh`, {
  //   resfresh: accessToken.refreshToken,
  // });

  // localStorage.setItem("accessToken", JSON.stringify(response.data));
  // req.headers.Authorization = `Bearer ${response.data.accessToken}`;

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
