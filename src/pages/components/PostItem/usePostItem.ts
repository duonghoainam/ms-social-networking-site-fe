import { useState } from 'react';

export const usePostItem = ({ post }: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  // const showAllLikesModel = async (a): Promise<void> => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };

  // const handleWatchMore = (e) => {
  //   e.target.previousElementSibling.style.overflow = 'auto';
  //   e.target.previousElementSibling.style.display = 'block';
  //   e.target.style.display = 'none';
  // };
  return {
    currentUser,
    isShowMessagePopup,
    setIsShowMessagePopup
  };
};
