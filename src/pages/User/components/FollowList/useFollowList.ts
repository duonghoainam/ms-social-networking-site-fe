import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../../app/state.type';
import './styles.scss';

export const useFollowList = (setShowModal: any): any => {
  const emtySrtingArray: string[] = [];
  const followersListStore = emtySrtingArray;
  const followingListStore = emtySrtingArray;

  // State
  const [followersList, setFollowersList] = useState(emtySrtingArray);
  const [followingList, setFollowingList] = useState(emtySrtingArray);

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
