/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '../../../Chat/ChatSlice';
import { useAppDispatch } from '../../../../app/store';
import { createNotification, follow, unFollow } from '../../../Home/homeSlice';
import { socket } from '../../../../App';

export const useUserHeader = (): any => {
  const current = useSelector((state: AppState) => state.auth.current);
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvataPopup, setIsShowChangeAvataPopup] = useState(false);

  const authUserId = useSelector((state: AppState) => state.auth.current._id);
  const UserInfo = useSelector((state: AppState) => state.user.userInfo);
  const posts = useSelector((state: AppState) => state.user.posts);

  // const isfollow = UserInfo?.followers
  //   ?.map((item: any) => {
  //     return item._id;
  //   })
  //   .includes(current?._id);
  const isfollow = (): boolean => {
    let isFollowed = false;
    UserInfo.followers.forEach((element: any) => {
      if (element._id === current._id) {
        isFollowed = true;
      }
    });
    return isFollowed;
  };

  const [IsFollow, setIsFollow] = useState(isfollow());

  const { name, avatar, _id } = UserInfo;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;

  const conversations = useSelector((state: AppState) => state.chat.conversations);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleShowFollow = (isFollowers: boolean): any => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

  const handleChangeAvt = (): any => {
    setIsShowChangeAvataPopup(true);
  };

  const handleGuiTinNhan = (currentUser: any, destinationUser: any): any => {
    let exist = [];
    if (conversations.length !== 0) {
      exist = conversations.filter((conversation: any) => {
        if (conversation.members.length === 2) {
          const listIds = conversation.members.map((member: any) => {
            return member._id;
          });
          if (
            Boolean(listIds.includes(currentUser._id)) &&
            Boolean(listIds.includes(destinationUser._id))
          ) {
            return true;
          }
        }
        return false;
      });
    }
    if (exist.length !== 0) {
      navigate(`/messenger/${exist[0]._id}`);
    } else {
      dispatch(createConversation({ users: [destinationUser] }))
        .unwrap()
        .then((resultValue: any) => {
          navigate(`/messenger/${resultValue.conversation._id}`);
        })
        .catch((rejectedValue: any) => console.log(rejectedValue));
    }
  };

  const handleFollow = async (id: any): Promise<void> => {
    if (IsFollow) {
      const action = unFollow(id);
      await dispatch(action).unwrap();
      setIsFollow(false);
    } else {
      const action1 = follow(id);
      await dispatch(action1).unwrap();
      setIsFollow(true);
      const notification = {
        postId: current._id,
        userId: UserInfo._id,
        type: 3,
        senderName: current.name,
        img: current.avatar
      };
      socket.emit('send_notificaton', notification);
      const paramsCreate = {
        receiver: id,
        notiType: 3,
        desId: current._id
      };
      const actionCreateNoti = createNotification(paramsCreate);
      await dispatch(actionCreateNoti).unwrap();
    }
  };

  return {
    current,
    showModal,
    setShowModal,
    setShowModalFollow,
    showModalFollow,
    isShowFollowers,
    setIsShowFollowers,
    isShowChangeAvataPopup,
    setIsShowChangeAvataPopup,
    authUserId,
    UserInfo,
    posts,
    IsFollow,
    name,
    avatar,
    _id,
    totalFollower,
    totalFollowing,
    conversations,
    handleFollow,
    handleShowFollow,
    handleChangeAvt,
    handleGuiTinNhan
  };
};
