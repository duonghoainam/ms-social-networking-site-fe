import { useState } from 'react';

export const usePostComment = (selectedPost: any): any => {
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const [isShowAllLikesPopup, setIsShowAllLikesPopup] = useState(false);

  const [isLike, setLikeCount]: [boolean, any] = useState(true);
  const [likeCount, setIsLike]: [number, any] = useState(selectedPost.likes.length);

  const hideAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(false);
  };
  const showAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(true);
  };
  return {
    isLike,
    likeCount,
    setLikeCount,
    setIsLike,
    isShowMessagePopup,
    setIsShowMessagePopup,
    isShowAllLikesPopup,
    showAllLikesPopup,
    hideAllLikesPopup
  };
};
