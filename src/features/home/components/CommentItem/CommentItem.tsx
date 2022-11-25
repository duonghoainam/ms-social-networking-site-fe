import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  FavoriteBorderOutlined,
  CheckCircle,
  Favorite,
  // ReplyRounded,
  ChatBubbleOutlineOutlined
} from '@material-ui/icons';
import '../commons/common.scss';
import TimeAgo from 'javascript-time-ago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useCommentItem } from './useCommentItem';
// import useCloseOutSideToClose from '../../../../hooks/useCloseOutSideToClose';
// import { socket } from '../../../../App';

const CommentItem = ({ comment }: any): ReactElement => {
  const timeAgo = new TimeAgo('en-US');
  const { isLike, isDelete, showChildrenComment, likeCount } = useCommentItem(comment);

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
            <span className="comment_content_caption_content">{comment.content}</span>
          </div>
          <div className="comment_content_interact">
            <p className="comment_content_interact_time">
              {/* {format(comment.updatedAt)} */}
              {timeAgo.format(Date.parse(comment.updatedAt), 'mini-now')}
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
              // onClick={async () => await ShowAlllikesModal(comment.likes)}
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
            {(isDelete as boolean) && (
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
                  className={isEdit == true ? "" : "disabled"}
                  onClick={() => handleEditCmt(comment._id)}
                >
                  Sửa
                </li> */}
                    <li
                      className={(isDelete as boolean) ? '' : 'disabled'}
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
          {!(showChildrenComment as boolean)
            ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              '____   Xem ' + comment.reply.length.toString() + ' câu trả lời'
            : '____   Ẩn câu trả lời'}
        </Col>
      ) : (
        ''
      )}

      {(showChildrenComment as boolean) ? (
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
