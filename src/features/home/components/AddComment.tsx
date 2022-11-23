import React, { ReactElement, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { InsertEmoticonOutlined } from '@material-ui/icons';
import Picker from 'emoji-picker-react';
// import {
//   addNewComment,
//   CancelReplyCmd,
//   createNotification,
//   getCommentsByPostID
// } from '../homeSlice';
// import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import useCloseOutSideToClose from '../../../hooks/useCloseOutSideToClose';
// import ErrToast from '../../../components/MessageToast/MessageToast';
// import { socket } from '../../../App';

const AddComment = ({ postId, userPostId }: any): ReactElement => {
  // const current = JSON.parse(localStorage.getItem("currentUser"));
  // const { replyingComment, isLoadingAddCmt, editingComment } = useSelector(
  //   (state) => state.home
  // );
  const replyingComment = {
    username: 'thuan'
  };

  // // useEffect(() => {
  // //   console.log(editingComment);
  // // }, [editingComment]);
  // const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  // const [inputValue, setinputValue] = useState(editingComment?.content);

  // const submitComment = async () => {
  //   const message = {
  //     postId,
  //     parentId: null,
  //     message: inputValue,
  //   };

  //   let params = {
  //     content: inputValue,
  //     postId: postId,
  //     commentId: replyingComment.id,
  //   };

  //   let paramsCreate = {};

  //   if (
  //     params.commentId != null &&
  //     params.commentId != "" &&
  //     params.commentId != undefined
  //   ) {
  //     //tiếp tục kiểu tra xem
  //     if (replyingComment.userId == userPostId) {
  //       //thằng được phản hồi chính là thằng chủ post
  //       if (current._id != replyingComment.userId) {
  //         let notification1 = {
  //           postId,
  //           userId: replyingComment.userId,
  //           type: 4,
  //           senderName: current.name,
  //           img: current.avatar,
  //         };
  //         socket.emit("send_notificaton", notification1);
  //         paramsCreate = {
  //           receiver: replyingComment.userId,
  //           notiType: 4,
  //           desId: postId,
  //         };
  //         const actionCreateNoti = createNotification(paramsCreate);
  //         dispatch(actionCreateNoti);
  //       }
  //     } else {
  //       //thằng được phản hồi không phải là chủ post
  //       let notification1 = {
  //         postId,
  //         userId: replyingComment.userId,
  //         type: 4,
  //         senderName: current.name,
  //         img: current.avatar,
  //       };
  //       paramsCreate = {
  //         receiver: replyingComment.userId,
  //         notiType: 4,
  //         desId: postId,
  //       };
  //       const actionCreateNoti = createNotification(paramsCreate);
  //       dispatch(actionCreateNoti);
  //       socket.emit("send_notificaton", notification1);
  //       if (current._id != userPostId) {
  //         let notification = {
  //           postId,
  //           userId: userPostId, // cái này là id của thằng cần gửi thông báo tới
  //           type: 1,
  //           senderName: current.name,
  //           img: current.avatar,
  //         };
  //         socket.emit("send_notificaton", notification);
  //         const paramsCreate1 = {
  //           receiver: userPostId,
  //           notiType: 1,
  //           desId: postId,
  //         };
  //         const actionCreateNoti1 = createNotification(paramsCreate1);
  //         dispatch(actionCreateNoti1);
  //       }
  //     }
  //   } else {
  //     if (current._id != userPostId) {
  //       let notification = {
  //         postId,
  //         userId: userPostId, // cái này là id của thằng cần gửi thông báo tới
  //         type: 1,
  //         senderName: current.name,
  //         img: current.avatar,
  //       };
  //       socket.emit("send_notificaton", notification);

  //       paramsCreate = {
  //         receiver: userPostId,
  //         notiType: 1,
  //         desId: postId,
  //       };
  //       const actionCreateNoti = createNotification(paramsCreate);
  //       dispatch(actionCreateNoti);
  //     }
  //   }

  //   const action = addNewComment(params);
  //   //const action1 = getCommentsByPostID(postId);

  //   //trước khi gửi emmit thì gọi api add comment vào trong backend
  //   try {
  //     await dispatch(action).unwrap();
  //     // await dispatch(action1).unwrap();
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   socket.emit("send_message", message);

  //   setinputValue("");
  //   setShowEmoji(false);
  // };

  // const handleEmojiClick = (event, emojiObject) => {
  //   setinputValue((a) => a + emojiObject.emoji);
  //   //setShowEmoji(false);
  // };

  // const DeleteReply = () => {
  //   const action = CancelReplyCmd();
  //   dispatch(action);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 13) {
  //     submitComment();
  //   }
  // };

  // let domNode = useCloseOutSideToClose(() => {
  //   setShowEmoji(false);
  // });

  return (
    <Row className="addComment">
      <div
        className="load"
        // style={{ display: isLoadingAddCmt == true ? '' : 'none' }}
      >
        <Spinner animation="border" variant="primary" size="sm" />
      </div>
      <Col md={1}>
        <InsertEmoticonOutlined onClick={() => setShowEmoji(!showEmoji)} />
      </Col>
      {showEmoji && (
        <Picker
          // ref={domNode}
          // className="addComment_emoji"
          onEmojiClick={() => {}}
          // pickerStyle={{
          //   width: '100%',
          //   outerHeight: '100%',
          //   innerHeight: '100px'
          // }}
          ></Picker>
      )}
      <Col md={9} className="reply">
        {replyingComment.username === '' ? (
          ''
        ) : (
          <span className="replyName">
            <span>{replyingComment.username}</span>
            <FontAwesomeIcon
              // onClick={DeleteReply}
              icon={faCircleXmark}
            />
          </span>
        )}

        <input
          type="text"
          // value={inputValue}
          // onChange={(e) => setinputValue(e.target.value)}
          // onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Thêm bình luận..."></input>
      </Col>
      <Col md={2}>
        <p
          style={{ textAlign: 'right' }}
          className="addComment_btn"
          // onClick={submitComment}
        >
          Đăng
        </p>
      </Col>
      {/* <ErrToast /> */}
    </Row>
  );
};

export default AddComment;
