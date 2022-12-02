import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPostsByUserId } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';

import { fakeUser } from '../../../../fake-data';

export const useUserPost = (): any => {
  // const activeId = useSelector((state: AppState) => state.user.activeId);
  const activeId = fakeUser._id;
  const posts = useSelector((state: AppState) => state.user.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getPostsByUserId(activeId);
      await dispatch(action).unwrap();
    };
    void useEffectAsyncFunc();
  }, [activeId]);

  return {
    posts
  };
};
