import React, {useEffect, useRef, useState} from 'react'
import { getHomePosts } from '../../state/homeActions';
import { useAppDispatch } from '../../../../app/store';
import { GetHomePostsDto } from '../../../../api/post/type/get-home-posts.dto';


export const useInfinitePostList = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch()
  const observer = useRef<IntersectionObserver | null>(null);
  let page = 1;
 
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
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
          setIsLoading(true);
          dispatch(getHomePosts(homePostsParams)).unwrap().then(() => {
            setIsLoading(false);
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

  return { isLoading };
};
