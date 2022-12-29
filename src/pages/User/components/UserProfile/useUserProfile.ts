import { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getFollowerList, getFollowingList, getPostsByUserId, getUserById } from '../../state/userActions';
import { useParams } from 'react-router-dom';

export const useUserProfile = (): any => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const loadData = async (): Promise<void> => {
    const getInfoAction = getUserById(id);
    await dispatch(getInfoAction).unwrap();

    const actionGetFollowerList = getFollowerList(id);
    await dispatch(actionGetFollowerList);

    const actionGetFollowingList = getFollowingList(id);
    await dispatch(actionGetFollowingList);

    const actionGetPost = getPostsByUserId(id);
    await dispatch(actionGetPost).unwrap();
  };

  useEffect(() => {
    void loadData();
  });
  return {};
};
