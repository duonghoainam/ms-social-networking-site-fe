/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useAppDispatch } from '../../../../app/store';

export const useFollowingItem = ({ user, setShowModal }: any): any => {
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const handleUnFollow = async (e: any): Promise<void> => {
    e.stopPropagation();
    alert('chưa handle')
  };

  const handleFollow = async (id: any): Promise<void> => {
    alert('chưa handle')
  };

  const handleDirectToAccount = (e: any): any => {
    e.stopPropagation();
    setShowModal(false);
    // const action = addActiveId(_id);
    // dispatch(action);
  };
  return {
    currentUser,
    handleFollow,
    handleUnFollow,
    handleDirectToAccount
  };
};
