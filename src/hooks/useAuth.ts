const useAuth = (): boolean => {
  // fake Data
  localStorage.setItem('currentUser', JSON.stringify({
    id: '52c91020-7306-11ed-b2af-d3ff38776900',
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
