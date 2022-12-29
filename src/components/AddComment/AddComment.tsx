import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
import { InsertEmoticonOutlined } from '@material-ui/icons';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddComment } from './useAddComment';

/**
 * Add comment section component in post comment detail
 * @param submit function to save comment
 * @returns
 */
const AddComment = ({ addCommentAction, postId, postUserId }: any): ReactElement => {
  const {
    submitComment,
    showEmoji,
    setShowEmoji,
    inputValue,
    setInputValue,
    handleKeyDown,
    handleEmojiClick,
    deleteReply
  } = useAddComment({ addCommentAction, postId, postUserId });
  const replyingComment = { username: '' };
  return (
    <>
      <Row>
        <div>
          {(showEmoji as boolean) && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height="400px"></EmojiPicker>
          )}
        </div>
      </Row>
      <Row className="addComment">
        <Col md={1}>
          <InsertEmoticonOutlined onClick={() => setShowEmoji(!(showEmoji as boolean))} />
        </Col>
        <Col md={9} className="reply">
          {replyingComment.username === '' ? (
            ''
          ) : (
            <span className="replyName">
              <span>{replyingComment.username}</span>
              <FontAwesomeIcon onClick={deleteReply} icon={faCircleXmark} />
            </span>
          )}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Thêm bình luận..."></input>
        </Col>
        <Col md={2}>
          <p style={{ textAlign: 'right' }} className="addComment_btn" onClick={submitComment}>
            Đăng
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AddComment;
