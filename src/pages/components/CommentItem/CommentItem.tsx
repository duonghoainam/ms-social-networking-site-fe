/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  FavoriteBorderOutlined,
  CheckCircle,
  Favorite,
  ChatBubbleOutlineOutlined
} from '@material-ui/icons';
import TimeAgo from 'javascript-time-ago';
import { useCommentItem } from './useCommentItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './CommentItem.scss';

const CommentItem = ({ comment }: any): ReactElement => {
  const timeAgo = new TimeAgo('en-US');
  const {
    isLike,
    likeCount,
    isShowChildrenComment,
    isShowCmtOption,
    setIsShowCommentOption,
    isCanEditAndDelete,
    handleDeleteComment
  } = useCommentItem(comment);

  return (
    <Row className="comment">
      <Col md={{ span: 1, offset: 1 }}>
        <div className="comment_avatar">
          <img src="" alt="" />
        </div>
      </Col>
      <Col md={{ span: 9 }}>
        <div className="comment_content">
          <div className="comment_content_caption">
            <span className="comment_content_caption_name">{comment.userInfo.name}</span>
            <CheckCircle />
            <span className="comment_content_caption_content">{comment.content}</span>
          </div>
          <div className="comment_content_interact">
            <p className="comment_content_interact_time">
              {timeAgo.format(Date.parse(comment.modifiedAt))}
            </p>
            {(isLike as boolean) ? (
              <Favorite
                className="likeActive"
                // oClick={async () => await handleLikeCmt(comment._id, comment.user._id)}
              />
            ) : (
              <FavoriteBorderOutlined
              // onClick={async () => await handleLikeCmt(comment._id)}
              />
            )}

            <p
              className="comment_content_interact_likes"
              // onClick={async () => await ShowAllLikesModal(comment.likes)}
            >
              {likeCount}
            </p>
            <p
              className="comment_content_interact_response"
              // onClick={() => HandleReply(comment._id, comment.user.name, comment.user._id)}
            >
              <ChatBubbleOutlineOutlined className="rep"></ChatBubbleOutlineOutlined>
              Trả lời
            </p>
            <div className="comment_content_interact_more">
                <FontAwesomeIcon
                  className="comment_content_interact_more"
                  icon={faEllipsis}
                  onClick={() => setIsShowCommentOption(!(Boolean(isShowCmtOption)))}
                />
                <div
                  className="comment_content_interact_more_option"
                  style={{ display: isShowCmtOption === true ? '' : 'none' }}
                >
                  <ul>
                    <li
                      className={isCanEditAndDelete === true ? '' : 'disabled'}
                      // onClick={() => handleEditCmt(CmtItem._id)}
                    >
                      Sửa
                    </li>
                    <li
                      className={isCanEditAndDelete === true ? '' : 'disabled'}
                      onClick={() => handleDeleteComment()}
                    >
                      Xóa
                    </li>
                    <li>
                      Báo cáo
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </Col>
      {comment.reply.length > 0 ? (
        <Col
          className="comment_childrenStatus"
          md={{ span: 10, offset: 2 }}
          // onClick={() => setShowChildrenComment(!isShowChildrenComment)}
        >
          {!(isShowChildrenComment as boolean)
            ? '____   Xem ' + comment.reply.length.toString() + ' câu trả lời'
            : '____   Ẩn câu trả lời'}
        </Col>
      ) : (
        ''
      )}
      {(isShowChildrenComment as boolean) ? (
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
