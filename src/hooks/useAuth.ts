import { fakeUser } from '../fake-data';
const useAuth = (): boolean => {
  // fake Data
  localStorage.setItem('currentUser', JSON.stringify(fakeUser));
  localStorage.setItem('accessToken', 'abc');

  // useAuth
  const accessToken = localStorage.getItem('accessToken');

  return accessToken !== null;
};
export default useAuth;
