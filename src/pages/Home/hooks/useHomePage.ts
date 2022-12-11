import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';
import { getHomePosts, getListRecommendedFriends } from '../state/homeActions';

export const useHomePage = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

  const { listPost, isLoading, loadListPostFail } = useSelector((state: AppState) => {
    return state.home;
  });

  const loadPosts = async (): Promise<void> => {
    await dispatch(getHomePosts(currentUser.id)).unwrap();
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
