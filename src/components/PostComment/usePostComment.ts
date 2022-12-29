import { useState } from 'react';

export const usePostComment = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const [isShowAllLikesPopup, setIsShowAllLikesPopup] = useState(false);

  const hideAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(false);
  };

  const showAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(true);
  };

  return {
    currentUser,
    isShowMessagePopup,
    setIsShowMessagePopup,
    isShowAllLikesPopup,
    showAllLikesPopup,
    hideAllLikesPopup
  };
};
