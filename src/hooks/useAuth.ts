const useAuth = (): boolean => {
  // fake Data
  localStorage.setItem('currentUser', JSON.stringify({
    id: 'ced42980-73e1-11ed-bb16-9bb599e6113c',
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
