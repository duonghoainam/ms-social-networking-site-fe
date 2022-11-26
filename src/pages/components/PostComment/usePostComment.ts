import { useState } from 'react';

export const usePostComment = (selectedPost: any): any => {
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  const [isLike, setLikeCount]: [boolean, any] = useState(true);
  const [likeCount, setIsLike]: [number, any] = useState(selectedPost.likes.length);

  return {
    isLike,
    likeCount,
    setLikeCount,
    setIsLike,
    isShowMessagePopup,
    setIsShowMessagePopup
  };
};
