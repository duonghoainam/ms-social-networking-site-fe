import { useAppDispatch } from '../../../app/store';
import { handleLike, handleUnLike } from '../state/homeActions';
import { setShowPostDetail } from '../state/homeSlice';

export const usePostComment = (): any => {
  const dispatch = useAppDispatch();

  const hideDetail = async (): Promise<void> => {
    const hide = setShowPostDetail(false);
    await dispatch(hide);
  };

  const handleLikePostComment = async (id: string, postState: any): Promise<void> => {
    postState.setIsLike(!(postState.isLike as boolean));
    if (postState.isLike as boolean) {
      postState.setLikeCount(--postState.likeCount);
      const action1 = handleUnLike(id);
      await dispatch(action1).unwrap();
    } else {
      postState.setLikeCount(++postState.likeCount);
      const action1 = handleLike(id);
      await dispatch(action1).unwrap();

      //   if (userId !== currentUser._id) {
      //     const paramsCreate = {
      //       receiver: userId,
      //       notiType: 2,
      //       desId: activePostId
      //     };
      //     const action = createNotification(paramsCreate);
      //     await dispatch(action).unwrap();
      //     const notification = {
      //       postId: activePostId,
      //       userId: userId, // cái này là id của thằng cần gửi thông báo tới
      //       type: 2,
      //       senderName: currentUser.name,
      //       img: currentUser.avatar
      //     };
      //     socket.emit('send_notificaton', notification);
      //   }
    }
  };

  // const showAlllikesModal = async (a) => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };
  return {
    hideDetail,
    handleLikePostComment
  };
};
