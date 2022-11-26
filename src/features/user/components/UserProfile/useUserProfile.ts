// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserById } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';

export const useUserProfile = (): any => {
  const activeId = useSelector((state: AppState) => state.user.activeId);

  //   const dispatch = useDispatch();
  //   useEffect(async () => {
  //     const action = getUserById(activeId);
  //     await dispatch(action);
  //   }, [activeId]);
  return {
    activeId
  };
};
