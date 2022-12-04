const useAuth = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken !== null;
};
export default useAuth;
