/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { AppState } from '../../../../app/state.type';
import { useSelector } from 'react-redux';

export const useUserHeader = (): any => {
  const current = useSelector((state: AppState) => state.auth.current);
  const [showModal, setShowModal] = useState(false);
  const [showModalFollow, setShowModalFollow] = useState(false);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowChangeAvataPopup, setIsShowChangeAvataPopup] = useState(false);

  const authUserId = useSelector((state: AppState) => state.auth.current._id);
  const UserInfo = useSelector((state: AppState) => state.user.userInfo);
  const posts = useSelector((state: AppState) => state.user.posts);

  const isfollow = UserInfo?.followers
    ?.map((item: any) => {
      return item._id;
    })
    .includes(current?._id);

  //   const [IsFollow, setIsFollow] = useState(isfollow);
  const [IsFollow, setIsFollow] = useState(false);

  const { name, avatar, _id } = UserInfo;
  const totalFollower = UserInfo.followers?.length;
  const totalFollowing = UserInfo.following?.length;

  const conversations = useSelector((state: AppState) => state.chat.conversations);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const handleShowFollow = (isFollowers) => {
  //     setIsShowFollowers(isFollowers);
  //     setShowModalFollow(true);
  //   };

  //   const handleChangeAvt = () => {
  //     setIsShowChangeAvataPopup(true);
  //   };
  //   const handleGuiTinNhan = (currentUser, destinationUser) => {
  //     let exist = [];
  //     console.log({ currentUser, destinationUser });
  //     console.log(conversations);
  //     if (conversations.length !== 0) {
  //       exist = conversations.filter((conversation) => {
  //         if (conversation.members.length === 2) {
  //           const listIds = conversation.members.map((member) => {
  //             return member._id;
  //           });
  //           if (listIds.includes(currentUser._id) && listIds.includes(destinationUser._id)) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     }
  //     if (exist.length !== 0) {
  //       navigate(`/messenger/${exist[0]._id}`);
  //     } else {
  //       dispatch(createConversation({ users: [destinationUser] }))
  //         .unwrap()
  //         .then((resultValue) => {
  //           navigate(`/messenger/${resultValue.conversation._id}`);
  //         })
  //         .catch((rejectedValue) => console.log(rejectedValue));
  //     }
  //   };

  //   const handleFollow = async (id) => {
  //     if (IsFollow) {
  //       const action = unFollow(id);
  //       await dispatch(action).unwrap();
  //       setIsFollow(false);
  //     } else {
  //       const action1 = follow(id);
  //       await dispatch(action1).unwrap();
  //       setIsFollow(true);
  //       let notification = {
  //         postId: current._id,
  //         userId: UserInfo._id,
  //         type: 3,
  //         senderName: current.name,
  //         img: current.avatar
  //       };
  //       socket.emit('send_notificaton', notification);
  //       let paramsCreate = {
  //         receiver: id,
  //         notiType: 3,
  //         desId: current._id
  //       };
  //       const actionCreateNoti = createNotification(paramsCreate);
  //       await dispatch(actionCreateNoti).unwrap();
  //     }
  //   };
  return {
    current,
    showModal,
    showModalFollow,
    isShowFollowers,
    isShowChangeAvataPopup,
    authUserId,
    UserInfo,
    posts,
    IsFollow,
    name,
    avatar,
    _id,
    totalFollower,
    totalFollowing,
    conversations
  };
};
