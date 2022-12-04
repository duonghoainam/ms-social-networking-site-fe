import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
import { getPosts } from '../state/homeActions';

export const useHomePage = (): any => {
  // const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();
  const { listPost, isLoading, loadListPostFail } = useSelector((state: AppState) => state.home);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      const action = getPosts();
      await dispatch(action).unwrap();
    };
    void loadPosts();
  }, []);
  return {
    listPost,
    isLoading,
    loadListPostFail
  };
};
