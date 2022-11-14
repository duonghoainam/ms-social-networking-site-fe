const getApiUrl = (): string => {
  let url: string;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = '';
      break;
    case 'development':
      url = 'http://localhost:3000';
      break;
    default:
      url = 'http://localhost:3000';
      break;
  }
  return url;
};
export { getApiUrl };
