import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getHomePosts, getListRecommendedFriends } from '../state/homeActions';

export const useHomePage = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

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
};
