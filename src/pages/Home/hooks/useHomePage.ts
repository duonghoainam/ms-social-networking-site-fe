import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getHomePosts, getListRecommendedFriends } from '../state/homeActions';
import postAPI from '../../../api/post/PostApi';
import { GetHomePostsDto } from '../../../api/post/type/get-home-posts.dto';

export const useHomePage = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

  // Infinite scrolling
  const [pageNum, setPageNum] = useState(1);
  const [isLastPost, setIsLastPost] = useState(false);

  const loadPosts = async (): Promise<void> => {
    if (!isLastPost) {
      const homePostsParams: GetHomePostsDto = {
        userId: currentUser.id,
        pageNumber: pageNum
      };
      const response = await postAPI.getHomePosts(homePostsParams);
      if (response.data.length > 0) {
        await dispatch(getHomePosts(homePostsParams)).unwrap();
      } else {
        setIsLastPost(true);
      }
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [pageNum]);

  const handleScroll = (): void => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      !isLastPost
    ) {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load recommend friends
  const loadRecommend = async (): Promise<void> => {
    await dispatch(getListRecommendedFriends(currentUser.id)).unwrap();
  };

  useEffect(() => {
    void loadRecommend();
  }, []);
};
