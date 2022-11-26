import { useNavigate } from 'react-router-dom';

export const usePostHeader = (): any => {
  const navigate = useNavigate();

  const handleShowProfile = (id: string): any => {
    // navigate to post's owner page
    navigate('/api/user');
  };

  return {
    handleShowProfile
  };
};
