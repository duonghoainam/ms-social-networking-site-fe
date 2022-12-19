import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store';
import { addActiveId } from '../../../User/userSlice';
import { getFollowerList, getFollowingList, getPostsByUserId, getUserById } from '../../../User/state/userActions';

export const usePostHeader = (): any => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleShowProfile = async (userId: string): Promise<void> => {
    const actionGetFollowerList = getFollowerList(userId);
    await dispatch(actionGetFollowerList);

    const actionGetFollowingList = getFollowingList(userId);
    await dispatch(actionGetFollowingList);

    const actionGetUser = getUserById(userId);
    await dispatch(actionGetUser).unwrap();

    const actionGetPost = getPostsByUserId(userId);
    await dispatch(actionGetPost).unwrap();

    const actionAddActiveId = addActiveId(userId);
    await dispatch(actionAddActiveId);
    navigate('/account');
  };

  return {
    handleShowProfile
  };
};
