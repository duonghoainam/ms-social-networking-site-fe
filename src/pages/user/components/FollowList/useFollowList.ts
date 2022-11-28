/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';

import './styles.scss';

export const useFollowList = (setShowModal: any): any => {
  const followersListStore = useSelector((state: AppState) => state.user.userInfo.followers);
  const followingListStore = useSelector((state: AppState) => state.user.userInfo.following);

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setFollowersList(followersListStore);
    setFollowingList(followingListStore);
  }, [followersListStore, followingListStore]);

  const handleCloseDialog = (): any => {
    setShowModal(false);
  };
  return {
    followersList,
    followingList,
    handleCloseDialog
  };
};
