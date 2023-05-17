import React, {useEffect, useRef, useState} from 'react'
import { getHomePosts } from '../../state/homeActions';
import { useAppDispatch } from '../../../../app/store';
import { GetHomePostsDto } from '../../../../api/post/type/get-home-posts.dto';

export const useInfinitePostList = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch()
  const observer = useRef<IntersectionObserver | null>(null);
  let page = 0;
  let isLastPost = false
 
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (isLastPost) return
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          page += 1;
          const homePostsParams: GetHomePostsDto = {
            userId: currentUser.id,
            pageNumber: page
          };
          setIsLoading(true);
          dispatch(getHomePosts(homePostsParams)).then((result) => {
            setIsLoading(false);
            if (result.payload.data.length === 0) {
              isLastPost = true;
            }
          });
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

  return { isLoading, isLastPost };
};
