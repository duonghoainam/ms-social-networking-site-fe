/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store';

export const useUserHeader = (): any => {
  const current = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const authUserId = current.id;
  const { userInfo, posts, followerList, followingList } = useSelector(
    (state: AppState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvataPopup, setIsShowChangeAvatarPopup] = useState(false);
  const isFollow = (): boolean => {
    let isFollowed = false;
    followerList.forEach((user: any) => {
      if (user.id === current.id) {
        isFollowed = true;
      }
    });
    return isFollowed;
  };
  const [isFollowed, setIsFollowed] = useState(isFollow());

  const handleShowFollow = (isFollowers: boolean): any => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

  const handleChangeAvt = (): any => {
    setIsShowChangeAvatarPopup(true);
  };

  const handleGuiTinNhan = (currentUser: any, destinationUser: any): any => {
    alert('Chưa handle');
  };

  const handleFollow = async (id: any): Promise<void> => {
    alert('chưa handle');
  };

  return {
    followerList,
    followingList,
    current,
    authUserId,
    userInfo,
    posts,
    isFollowed,
    showModal,
    setShowModal,
    showModalFollow,
    setShowModalFollow,
    isShowFollowers,
    setIsShowFollowers,
    isShowChangeAvataPopup,
    setIsShowChangeAvatarPopup,
    handleFollow,
    handleShowFollow,
    handleChangeAvt,
    handleGuiTinNhan
  };
};
