import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { handleDislike, handleLike } from '../../state/homeActions';
import { setShowPostDetail } from '../../state/homeSlice';

export const usePostComment = (): any => {
  const selectedPost = useSelector((state: AppState) => state.home.selectedPost);
  const dispatch = useAppDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
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

  const likeComment = async (): Promise<void> => {
    const actionLike = handleLike({ userId: currentUser.id, postId: selectedPost.id });
    await dispatch(actionLike).unwrap();
  }
  const dislikeComment = async (): Promise<void> => {
    const actionLike = handleDislike({ userId: currentUser.id, postId: selectedPost.id });
    await dispatch(actionLike).unwrap();
  }

  return {
    currentUser,
    selectedPost,
    hideDetail,
    likeComment,
    dislikeComment,
    isShowMessagePopup,
    setIsShowMessagePopup,
    isShowAllLikesPopup,
    showAllLikesPopup,
    hideAllLikesPopup
  };
};
