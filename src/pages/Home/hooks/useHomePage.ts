import { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getHomePosts, getListRecommendedFollowings } from '../state/homeActions';
import postAPI from '../../../api/post/PostApi';
import { GetHomePostsDto } from '../../../api/post/type/get-home-posts.dto';

export const useHomePage = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

  // Load recommend friends
  const loadRecommend = async (): Promise<void> => {
    await dispatch(getListRecommendedFollowings(currentUser.id)).unwrap();
  };

  useEffect(() => {
    void loadRecommend();
  }, []);
};
