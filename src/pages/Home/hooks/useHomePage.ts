import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
import { getPosts } from '../state/homeActions';

export const useHomePage = (): any => {
  const dispatch = useAppDispatch();
  const { listPost, isLoading, loadListPostFail } = useSelector((state: AppState) => {
    return state.home;
  });

  const loadPosts = async (): Promise<void> => {
    await dispatch(getPosts()).unwrap();
  };
  useEffect(() => {
    void loadPosts();
  }, []);
  return {
    listPost,
    isLoading,
    loadListPostFail
  };
};
