import React, { ReactElement, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  FavoriteBorderOutlined,
  CheckCircle,
  Favorite,
  // ReplyRounded,
  ChatBubbleOutlineOutlined
} from '@material-ui/icons';
import './common.scss';
import { useSelector } from 'react-redux';
// import {
//   createNotification,
//   deleteComment,
//   getCommentsByPostID,
//   getListUser,
//   likeOrUnlikeCmt,
//   SetReplyCmd
// } from '../../homeSlice';
import TimeAgo from 'javascript-time-ago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../../../app/state.type';
// import useCloseOutSideToClose from '../../../../hooks/useCloseOutSideToClose';
// import { socket } from '../../../../App';

const CommentItem = ({ comment }: any): ReactElement => {
  // const dispatch = useDispatch();
  const timeAgo = new TimeAgo('en-US');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  // const islike = comment.likes.includes(currentUser._id);

  // // state use in this component
  // let [NumLikes, setNumLikes] = useState(comment.likes.length);
  const [isLike] = useState(false);
  const [showChildrenComment] = useState(false);
  // const [isShowCmtOption, setisShowCmtOption] = useState(false);

  // // get state from redux store
  const { activePostId, listPosts, post } = useSelector((state: AppState) => state.home);

  // // variable
  // const { reply } = comment;
  let activePost: any = {};
  if (Object.keys(post).length === 0) {
    activePost = listPosts.find((post: any) => post._id === activePostId);
  } else {
    activePost = post;
  }

  const isDelete =
    comment?.user?._id === currentUser?._id || currentUser?._id === activePost?.user?._id;

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

  return (
    <Row className="comment">
      <Col md={{ span: 1, offset: 1 }}>
        <div className="comment_avatar">
          <img src={comment.user.avatar} alt="" />
        </div>
      </Col>
      <Col md={{ span: 9 }}>
        <div className="comment_content">
          <div className="comment_content_caption">
            <span className="comment_content_caption_name">{comment.user.name}</span>
            <CheckCircle />
            <span className="comment_content_caption_contnet">{comment.content}</span>
          </div>
          <div className="comment_content_interact">
            <p className="comment_content_interact_time">
              {/* {format(comment.updatedAt)} */}
              {timeAgo.format(Date.parse(comment.updatedAt), 'mini-now')}
            </p>
            {isLike ? (
              <Favorite
                className="likeActive"
                // onClick={async () => await handleLikeCmt(comment._id, comment.user._id)}
              />
            ) : (
              <FavoriteBorderOutlined
              // onClick={async () => await handleLikeCmt(comment._id)}
              />
            )}

            <p
              className="comment_content_interact_luotthich"
              // onClick={async () => await ShowAlllikesModal(comment.likes)}
            >
              {/* {NumLikes} */}
            </p>

            <p
              className="comment_content_interact_response"
              // onClick={() => HandleReply(comment._id, comment.user.name, comment.user._id)}
            >
              <ChatBubbleOutlineOutlined className="rep"></ChatBubbleOutlineOutlined>
              Trả lời
            </p>
            {isDelete && (
              <div className="comment_content_interact_more">
                <FontAwesomeIcon
                  // className="comment_content_interact_more"
                  icon={faEllipsis}
                  // onClick={() => setisShowCmtOption(!isShowCmtOption)}
                />
                <div
                  // ref={domNode1}
                  className="comment_content_interact_more_option"
                  // style={{ display: isShowCmtOption ? '' : 'none' }}
                >
                  <ul>
                    {/* <li
                  className={isEdit == true ? "" : "disabledd"}
                  onClick={() => handleEditCmt(comment._id)}
                >
                  Sửa
                </li> */}
                    <li
                      className={isDelete ? '' : 'disabledd'}
                      // onClick={async () => await handleDeleteCmt(comment._id)}
                    >
                      Xóa
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Col>
      {/* <Col md={{ span: 1 }} className="comment_like">
        {isLike ? (
          <Favorite
            className="likeActive"
            onClick={() => handleLikeCmt(comment._id, comment.user._id)}
          />
        ) : (
          <FavoriteBorderOutlined onClick={() => handleLikeCmt(comment._id)} />
        )}
      </Col> */}
      {comment.reply.length > 0 ? (
        <Col
          className="comment_childrenStatus"
          md={{ span: 10, offset: 2 }}
          // onClick={() => setShowChildrenComment(!showChildrenComment)}
        >
          {!showChildrenComment
            ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              '____   Xem ' + comment.reply.length.toString() + ' câu trả lời'
            : '____   Ẩn câu trả lời'}
        </Col>
      ) : (
        ''
      )}

      {showChildrenComment ? (
        <Col className="comment_chilrentCmt">
          {comment.reply.length > 0 &&
            comment.reply.map((item: any) => {
              return <CommentItem key={item._id} comment={item} />;
            })}
        </Col>
      ) : (
        <Col></Col>
      )}
    </Row>
  );
};

export default CommentItem;
