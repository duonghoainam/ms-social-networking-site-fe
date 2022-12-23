import { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getUserById } from '../../state/userActions';
import { useParams } from 'react-router-dom';

export const useUserProfile = (): any => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getUserById(id);
      await dispatch(action);
    };

    void useEffectAsyncFunc();
  });
  return {};
};
