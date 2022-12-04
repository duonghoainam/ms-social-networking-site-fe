import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getUserById } from '../../state/userActions';

export const useUserProfile = (): any => {
  const activeId = useSelector((state: AppState) => state.user.activeId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getUserById(activeId);
      await dispatch(action);
    };

    void useEffectAsyncFunc();
  }, [activeId]);
  return {};
};
