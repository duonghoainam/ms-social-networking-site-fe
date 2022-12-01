import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByUserId } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';

import { fakeUser, fakePosts } from '../../../../fake-data';

export const useUserPost = (): any => {
  // const activeId = useSelector((state: AppState) => state.user.activeId);
  // const posts = useSelector((state: AppState) => state.user.posts);
  const dispatch = useDispatch();
  const activeId = fakeUser._id;
  const posts = fakePosts;

  useEffect(() => {
    const useEffectAsyncFunc = async (): Promise<void> => {
      const action = getPostsByUserId(activeId);
      // await dispatch(action);
    };
    void useEffectAsyncFunc();
  }, [activeId]);

  return {
    posts
  };
};
