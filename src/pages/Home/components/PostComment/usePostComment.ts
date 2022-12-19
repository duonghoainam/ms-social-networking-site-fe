import { useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { handleDislike, handleLike } from '../../state/homeActions';
import { setShowPostDetail } from '../../state/homeSlice';

export const usePostComment = (selectedPost: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch();

  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);
  const [isShowAllLikesPopup, setIsShowAllLikesPopup] = useState(false);

  const hideAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(false);
  };

  const showAllLikesPopup = (): void => {
    setIsShowAllLikesPopup(true);
  };

  const hideDetail = async (): Promise<void> => {
    const hide = setShowPostDetail(false);
    await dispatch(hide);
  };
  const likePost = async (): Promise<void> => {
    const actionLike = handleLike({ userId: currentUser.id, postId: selectedPost._id });
    await dispatch(actionLike).unwrap();
  }
  const dislikePost = async (): Promise<void> => {
    const actionLike = handleDislike({ userId: currentUser.id, postId: selectedPost._id });
    await dispatch(actionLike).unwrap();
  }

  return {
    currentUser,
    likePost,
    dislikePost,
    hideDetail,
    isShowMessagePopup,
    setIsShowMessagePopup,
    isShowAllLikesPopup,
    showAllLikesPopup,
    hideAllLikesPopup
  };
};
