import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
import { getPosts, getListRecommendedFriends } from '../state/homeActions';

export const useHomePage = (): any => {
  const dispatch = useAppDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const { listPost, isLoading, loadListPostFail } = useSelector((state: AppState) => {
    return state.home;
  });

  const loadPosts = async (): Promise<void> => {
    await dispatch(getPosts()).unwrap();
  };
  useEffect(() => {
    void loadPosts();
  }, []);

  const loadRecommend = async (): Promise<void> => {
    await dispatch(getListRecommendedFriends(currentUser.id)).unwrap();
  };
  useEffect(() => {
    void loadRecommend();
  }, []);
  return {
    listPost,
    isLoading,
    loadListPostFail
  };
};
