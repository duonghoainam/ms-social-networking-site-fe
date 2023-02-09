import { useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';

export const useUserHeader = (): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const { userInfo, posts, followerList, followingList } = useSelector(
    (state: AppState) => state.user
  );
  // State
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvatarPopup, setIsShowChangeAvatarPopup] = useState(false);

  const handleChangeAvt = (): any => {
    setIsShowChangeAvatarPopup(true);
  };
  const handleShowFollow = (isFollowers: boolean): any => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };
  return {
    followerList,
    followingList,
    currentUser,
    userInfo,
    posts,
    showModal,
    setShowModal,
    showModalFollow,
    setShowModalFollow,
    isShowFollowers,
    setIsShowFollowers,
    isShowChangeAvatarPopup,
    setIsShowChangeAvatarPopup,
    handleChangeAvt,
    handleShowFollow
  };
};
