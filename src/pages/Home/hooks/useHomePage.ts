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

  // fix lazing loading
  const observer = useRef<IntersectionObserver | null>(null);
  let page = 1;
  const homePostsParams: GetHomePostsDto = {
    userId: currentUser.id,
    pageNumber: page
  };

  useEffect(()=>{
    dispatch(getHomePosts(homePostsParams)).unwrap()

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          page += 1;
          const homePostsParams: GetHomePostsDto = {
            userId: currentUser.id,
            pageNumber: page
          };
          dispatch(getHomePosts(homePostsParams)).unwrap()
        }
      });
    }, options);

    const observerTarget = document.querySelector('#observer-target');
    if (observerTarget) {
      observer.current.observe(observerTarget);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch])
};
