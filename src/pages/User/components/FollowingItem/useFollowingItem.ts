/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../../../App';
// import { createNotification, follow } from '../../../Home/homeSlice';
// import { unFollow, addActiveId } from '../../profileSlice';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';

export const useFollowingItem = ({ user, setShowModal }: any): any => {
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('LoginUser') ?? '');

  const handleUnFollow = async (e: any): Promise<void> => {
    e.stopPropagation();
    // const action = unFollow(_id);
    // await dispatch(action).unwrap();
  };

  // const handleFollow = async (id: any): Promise<void> => {
  //   if (isFollow) {
  //     const action = unFollow(id);
  //     await dispatch(action).unwrap();
  //     setIsFollow(false);
  //   } else {
  //     const action1 = follow(id);
  //     await dispatch(action1).unwrap();
  //     setIsFollow(true);
  //     const notification = {
  //       postId: current._id,
  //       userId: _id,
  //       type: 3,
  //       senderName: current.name,
  //       img: current.avatar
  //     };
  //     socket.emit('send_notificaton', notification);
  //     const paramsCreate = {
  //       receiver: id,
  //       notiType: 3,
  //       desId: current._id
  //     };
  //     const actionCreateNoti = createNotification(paramsCreate);
  //     await dispatch(actionCreateNoti).unwrap();
  //   }
  // };

  const handleDirectToAccount = (e: any): any => {
    e.stopPropagation();
    setShowModal(false);
    // const action = addActiveId(_id);
    // dispatch(action);
  };
  return {
    currentUser,
    // handleFollow,
    handleUnFollow,
    handleDirectToAccount
  };
};
