const getApiUrl = (): string => {
  let url: string;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = '';
      break;
    case 'development':
      url = 'http://localhost:3000/api';
      break;
    default:
      url = 'http://localhost:3000/api';
      break;
  }
  return url;
};
export { getApiUrl };
