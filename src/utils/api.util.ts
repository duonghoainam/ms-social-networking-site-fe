const getApiUrl = (): string => {
  const url: string = process.env.REACT_APP_BASE_API_URL ?? 'http://localhost:3000/api';
  return url;
};
export { getApiUrl };
