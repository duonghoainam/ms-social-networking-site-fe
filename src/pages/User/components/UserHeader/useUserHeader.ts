/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/store';

import { fakeUser, fakePosts } from '../../../../fake-data';

export const useUserHeader = (): any => {
  // const current = useSelector((state: AppState) => state.login.current);
  // const authUserId = useSelector((state: AppState) => state.login.current._id);
  // const UserInfo = useSelector((state: AppState) => state.user.userInfo);
  // const posts = useSelector((state: AppState) => state.user.posts);
  const current = fakeUser;
  const authUserId = fakeUser._id;
  const UserInfo = fakeUser;
  const posts = fakePosts;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvataPopup, setIsShowChangeAvataPopup] = useState(false);
  const isfollow = (): boolean => {
    let isFollowed = false;
    UserInfo.followers.forEach((element: any) => {
      if (element._id === current._id) {
        isFollowed = true;
      }
    });
    return isFollowed;
  };
  const [isFollowed, setIsFollowed] = useState(isfollow());

  const handleShowFollow = (isFollowers: boolean): any => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

  const handleChangeAvt = (): any => {
    setIsShowChangeAvataPopup(true);
  };

  const handleGuiTinNhan = (currentUser: any, destinationUser: any): any => {
    alert('Chưa handle')
  };

  const handleFollow = async (id: any): Promise<void> => {
    alert('chưa handle')
  };

  return {
    current,
    authUserId,
    UserInfo,
    posts,
    totalFollower,
    totalFollowing,
    isFollowed,
    showModal,
    setShowModal,
    showModalFollow,
    setShowModalFollow,
    isShowFollowers,
    setIsShowFollowers,
    isShowChangeAvataPopup,
    setIsShowChangeAvataPopup,
    handleFollow,
    handleShowFollow,
    handleChangeAvt,
    handleGuiTinNhan
  };
};
