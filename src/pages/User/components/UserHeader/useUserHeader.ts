import { useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/store';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '../../../Chat/state/chatAction';

export const useUserHeader = (): any => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const conversations = useSelector((state: any) => state.chat.conversations);

  const { userInfo, posts, followerList, followingList } = useSelector(
    (state: AppState) => state.user
  );

  // State
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvatarPopup, setIsShowChangeAvatarPopup] = useState(false);
  const isFollow = (): boolean => {
    let isFollowed = false;
    followerList.forEach((user: any) => {
      if (user.id === currentUser.id) {
        isFollowed = true;
      }
    });
    return isFollowed;
  };
  const [isFollowed] = useState(isFollow());

  const handleShowFollow = (isFollowers: boolean): any => {
    setIsShowFollowers(isFollowers);
    setShowModalFollow(true);
  };

  const handleChangeAvt = (): any => {
    setIsShowChangeAvatarPopup(true);
  };

  const handleSendMessage = (currentUser: any, destinationUser: any): any => {
    let exist = [];
    if (conversations.length !== 0) {
      exist = conversations.filter((conversation: any) => {
        if (conversation.members.length === 2) {
          const listIds = conversation.members.map((member: any) => {
            return member.id;
          });
          if (listIds.includes(currentUser.id) && listIds.includes(destinationUser.id)) {
            return true;
          }
        }
        return false;
      });
    }
    if (exist.length !== 0) {
      navigate(`/messenger/${exist[0]._id}`);
    } else {
      dispatch(createConversation({
        members: [currentUser.id, destinationUser.id],
        createdBy: currentUser.id,
      }))
        .unwrap()
        .then((conversation) => {
          navigate(`/messenger/${conversation._id}`);
        })
        .catch((rejectedValue) => console.log(rejectedValue));
    }
  };

  const handleFollow = async (id: any): Promise<void> => {
    alert('chưa handle');
  };

  return {
    followerList,
    followingList,
    currentUser,
    userInfo,
    posts,
    isFollowed,
    showModal,
    setShowModal,
    showModalFollow,
    setShowModalFollow,
    isShowFollowers,
    setIsShowFollowers,
    isShowChangeAvatarPopup,
    setIsShowChangeAvatarPopup,
    handleFollow,
    handleShowFollow,
    handleChangeAvt,
    handleSendMessage
  };
};
