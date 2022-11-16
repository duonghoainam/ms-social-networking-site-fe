import queryString from 'query-string';
import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem('accessToken')
    ? JSON.parse(localStorage.getItem('accessToken'))
    : null;

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken.accessToken}`;
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
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
