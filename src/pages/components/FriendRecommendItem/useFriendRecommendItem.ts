import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../../../app/store';

export const useFriendRecommendItem = (): any => {
  const navigate = useNavigate();
  // const current = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isShowRecommend, setIsShowRecommend] = useState(false);
  // const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = (id: string): void => {
    if (isFollow) {
      // const action = unFollow(id);
      // dispatch(action);

      setIsFollow(false);
    } else {
      // const action1 = follow(id);
      // dispatch(action1);
      // setIsFollow(true);
      // const notification = {
      //   postId: current._id,
      //   userId: user._id,
      //   type: 3,
      //   senderName: current.name,
      //   img: current.avatar
      // };
      // socket.emit('send_notificaton', notification);
      // const paramsCreate = {
      //   receiver: id,
      //   notiType: 3,
      //   desId: current._id
      // };
      // const actionCreateNoti = createNotification(paramsCreate);
      // dispatch(actionCreateNoti);
    }
  };

  const showRecommend = (): void => {
    setIsShowRecommend(true);
  };

  const hideRecommend = (): void => {
    setIsShowRecommend(false);
  };

  const handleShowProfile = (): void => {
    // const action = addActiveId(id);
    // dispatch(action);
    navigate('/account');
  };
  return {
    isShowRecommend,
    setIsFollow,
    showRecommend,
    hideRecommend,
    handleShowProfile,
    handleFollow
  };
};
