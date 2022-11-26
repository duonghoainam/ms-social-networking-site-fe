import { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { addNewComment } from '../../home/state/homeActions';

export const useAddComment = (): any => {
  // const current = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useAppDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const submitComment = async (): Promise<void> => {
    // const message = {
    //   postId,
    //   parentId: null,
    //   message: inputValue,
    // };
    // let params = {
    //   content: inputValue,
    //   postId: postId,
    //   commentId: replyingComment.id,
    // };
    // let paramsCreate = {};
    // if (
    //   params.commentId != null &&
    //   params.commentId != "" &&
    //   params.commentId != undefined
    // ) {
    //   //tiếp tục kiểu tra xem
    //   if (replyingComment.userId == userPostId) {
    //     //thằng được phản hồi chính là thằng chủ post
    //     if (current._id != replyingComment.userId) {
    //       let notification1 = {
    //         postId,
    //         userId: replyingComment.userId,
    //         type: 4,
    //         senderName: current.name,
    //         img: current.avatar,
    //       };
    //       socket.emit("send_notificaton", notification1);
    //       paramsCreate = {
    //         receiver: replyingComment.userId,
    //         notiType: 4,
    //         desId: postId,
    //       };
    //       const actionCreateNoti = createNotification(paramsCreate);
    //       dispatch(actionCreateNoti);
    //     }
    //   } else {
    //     //thằng được phản hồi không phải là chủ post
    //     let notification1 = {
    //       postId,
    //       userId: replyingComment.userId,
    //       type: 4,
    //       senderName: current.name,
    //       img: current.avatar,
    //     };
    //     paramsCreate = {
    //       receiver: replyingComment.userId,
    //       notiType: 4,
    //       desId: postId,
    //     };
    //     const actionCreateNoti = createNotification(paramsCreate);
    //     dispatch(actionCreateNoti);
    //     socket.emit("send_notificaton", notification1);
    //     if (current._id != userPostId) {
    //       let notification = {
    //         postId,
    //         userId: userPostId, // cái này là id của thằng cần gửi thông báo tới
    //         type: 1,
    //         senderName: current.name,
    //         img: current.avatar,
    //       };
    //       socket.emit("send_notificaton", notification);
    //       const paramsCreate1 = {
    //         receiver: userPostId,
    //         notiType: 1,
    //         desId: postId,
    //       };
    //       const actionCreateNoti1 = createNotification(paramsCreate1);
    //       dispatch(actionCreateNoti1);
    //     }
    //   }
    // } else {
    //   if (current._id != userPostId) {
    //     let notification = {
    //       postId,
    //       userId: userPostId, // cái này là id của thằng cần gửi thông báo tới
    //       type: 1,
    //       senderName: current.name,
    //       img: current.avatar,
    //     };
    //     socket.emit("send_notificaton", notification);
    //     paramsCreate = {
    //       receiver: userPostId,
    //       notiType: 1,
    //       desId: postId,
    //     };
    //     const actionCreateNoti = createNotification(paramsCreate);
    //     dispatch(actionCreateNoti);
    //   }
    // }
    const action = addNewComment({ postId: 'id', comment: {} });
    try {
      await dispatch(action).unwrap();
      // await dispatch(action1).unwrap();
    } catch (err) {
      console.log(err);
    }
    // socket.emit("send_message", message);
    setInputValue('');
    setShowEmoji(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setInputValue((value: string) => value + emojiData.emoji);
  };

  const deleteReply = (): void => {
    // const action = CancelReplyCmd();
    // dispatch(action);
  };

  const handleKeyDown = async (event: any): Promise<void> => {
    if (event.keyCode === 13) {
      await submitComment();
    }
  };

  return {
    showEmoji,
    setShowEmoji,
    inputValue,
    setInputValue,
    handleEmojiClick,
    handleKeyDown,
    deleteReply
  };
};
