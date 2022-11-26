// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { getPostsByUserId } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';

export const useUserPost = (): any => {
  //   const dispatch = useDispatch();
  //   const activeId = useSelector((state: AppState) => state.user.activeId);
  const posts = useSelector((state: AppState) => state.user.posts);
  //   useEffect(async () => {
  //     const action = getPostsByUserId(activeId);
  //     await dispatch(action);
  //   }, [activeId]);
  return {
    posts
  };
};
