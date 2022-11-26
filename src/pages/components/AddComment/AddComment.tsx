import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
import { InsertEmoticonOutlined } from '@material-ui/icons';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddComment } from './useAddComment';

/**
 * Add comment section component in post comment detail
 * @param param0
 * @returns
 */
const AddComment = ({ postId, userPostId }: any): ReactElement => {
  const {
    showEmoji,
    setShowEmoji,
    inputValue,
    setInputValue,
    submitComment,
    handleKeyDown,
    handleEmojiClick,
    deleteReply
  } = useAddComment();
  const replyingComment = { username: 'thuan' };
  return (
    <>
      <Row>
        <div>
          {(showEmoji as boolean) && (
            <EmojiPicker
              // className="addComment_emoji"
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
        {/* <ErrToast /> */}
      </Row>
    </>
  );
};

export default AddComment;
