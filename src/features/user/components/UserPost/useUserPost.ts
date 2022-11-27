import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByUserId } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';

export const useUserPost = (): any => {
  const dispatch = useDispatch();
  const activeId = useSelector((state: AppState) => state.user.activeId);
  const posts = useSelector((state: AppState) => state.user.posts);
  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getPostsByUserId(activeId);
      await dispatch(action);
    };
    void useEffectAsyncFunc();
  }, [activeId]);
  // useEffect(async () => {
  //   const action = getPostsByUserId(activeId);
  //   await dispatch(action);
  // }, [activeId]);
  return {
    posts
  };
};
