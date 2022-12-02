import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../../app/state.type';
import './styles.scss';

import { fakeUser } from '../../../../fake-data';
import { string } from 'yup/lib/locale';

export const useFollowList = (setShowModal: any): any => {
  // const followersListStore = useSelector((state: AppState) => state.user.userInfo.followers);
  // const followingListStore = useSelector((state: AppState) => state.user.userInfo.following);
  const followersListStore = fakeUser.followers;
  const followingListStore = fakeUser.following;

  // State
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    setFollowersList(followersListStore);
    setFollowingList(followingListStore);
  }, [followersListStore, followingListStore]);

  // Handle
  const handleCloseDialog = (): any => {
    setShowModal(false);
  };

  return {
    followersList,
    followingList,
    handleCloseDialog
  };
};
