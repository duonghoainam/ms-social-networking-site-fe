import { AppState } from '../../../../app/state.type';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserById } from '../../profileSlice';

export const useUserProfile = (): any => {
  const activeId = useSelector((state: AppState) => state.user.activeId);

  const dispatch = useDispatch();
  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getUserById(activeId);
      await dispatch(action);
    };

    void useEffectAsyncFunc();
  }, [activeId]);
  // useEffect(async () => {
  //   const action = getUserById(activeId);
  //   await dispatch(action);
  // }, [activeId]);
  return {};
};
