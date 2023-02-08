const getApiUrl = (): string => {
  const url: string = process.env.REACT_APP_BASE_API_URL ?? 'http://localhost:3000/api';
  return url;
};
const getSocketUrl = (): string => {
  const url: string = process.env.REACT_APP_BASE_SOCKET_URL ?? 'http://localhost:3003';
  return url;
};
export { getApiUrl, getSocketUrl };
