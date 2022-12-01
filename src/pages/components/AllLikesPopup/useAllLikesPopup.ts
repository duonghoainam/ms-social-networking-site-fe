import { useState } from 'react';
export const useAllLikesPopup = ({ post }: any): any => {
  const [isShowAllLikesPopup, setIsShowAllLikesPopup] = useState(false);

  const showAllLikesPopup = (): any => {
    setIsShowAllLikesPopup(true);
  };

  const hideAllLikesPopup = (): any => {
    setIsShowAllLikesPopup(false);
  };

  return {
    hideAllLikesPopup,
    isShowAllLikesPopup,
    showAllLikesPopup
  };
};
