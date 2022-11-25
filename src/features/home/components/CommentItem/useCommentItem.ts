import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';

export const useCommentItem = (comment: any): any => {
  // const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  let [isLike] = useState(false);
  isLike = comment.likes.includes(currentUser._id);

  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [showChildrenComment] = useState(false);
  // const [isShowCmtOption, setisShowCmtOption] = useState(false);

  const { selectedPost } = useSelector((state: AppState) => state.home);

  const isDelete =
    comment?.user?._id === currentUser?._id || currentUser?._id === selectedPost?.user?._id;

  // const ShowAlllikesModal = async (a) => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };

  // const HandleReply = (cmtId, userName, userId) => {
  //   const action = SetReplyCmd({ cmtId, userName, userId });
  //   dispatch(action);
  // };

  // const handleLikeCmt = async (id, x) => {
  //   setIsLike(!isLike);
  //   const action = likeOrUnlikeCmt(id);
  //   if (isLike === true) {
  //     setNumLikes(--NumLikes);
  //   } else {
  //     setNumLikes(++NumLikes);

  //     const paramsCreate = {
  //       receiver: comment.user._id,
  //       notiType: 6,
  //       desId: activePost._id
  //     };

  //     const actionCreateNoti = createNotification(paramsCreate);
  //     await dispatch(actionCreateNoti).unwrap();

  //     if (currentUser._id !== comment.user._id) {
  //       const notification = {
  //         postId: activePost._id,
  //         userId: comment.user._id,
  //         type: 6,
  //         senderName: currentUser.name,
  //         img: currentUser.avatar
  //       };
  //       socket.emit('send_notificaton', notification);
  //     }
  //   }

  //   try {
  //     await dispatch(action);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // const handleEditCmt = (id) => {
  // //   //const action = editCmt(comment);
  // //   //dispatch(action);
  // // };

  // const handleDeleteCmt = async (id) => {
  //   const action = deleteComment({ CmtId: id });
  //   try {
  //     await dispatch(action).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     const action1 = getCommentsByPostID(activePostId);
  //     dispatch(action1);
  //   } catch (error) {}
  // };

  // const domNode1 = useCloseOutSideToClose(() => {
  //   setisShowCmtOption(false);
  // });
  return {
    isLike,
    isDelete,
    likeCount,
    showChildrenComment
  };
};
