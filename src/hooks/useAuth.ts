const useAuth = (): boolean => {
  // fake Data
  localStorage.setItem('currentUser', JSON.stringify({
    id: '47e5b7d0-7392-11ed-a275-43dcab608ba2',
    name: 'minh1',
    gender: 'male',
    dateOfBirth: 1669280508646
  }));
  localStorage.setItem('accessToken', 'abc');

  // useAuth
  const accessToken = localStorage.getItem('accessToken');

  return accessToken !== null;
};
export default useAuth;
