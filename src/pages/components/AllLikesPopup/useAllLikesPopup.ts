import { useState } from 'react';
export const useAllLikesPopup = ({ post }: any): any => {
  let isLoadThatPost = false;
  if (post !== undefined && post !== null) {
    isLoadThatPost = true;
  }
  const [isShowAllLikesPopup, setIsShowAllLikesPopup] = useState(false);

  const showAllLikesPopup = (): any => {
    setIsShowAllLikesPopup(true);
  };

  const hideAllLikesPopup = (): any => {
    setIsShowAllLikesPopup(false);
  };

  return {
    isLoadThatPost,
    hideAllLikesPopup,
    isShowAllLikesPopup,
    showAllLikesPopup
  };
};
