/* eslint-disable multiline-ternary */
import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Favorite, ChatBubble } from '@material-ui/icons';
import PostComment from '../../../components/PostComment/PostComment';
import './styles.scss';
import { usePostItem } from './usePostItem';

const PostItem = (props: { post: any }): ReactElement => {
  const { isShowPostDetail, showDialog } = usePostItem();
  const postItem = props.post;

  return (
    <>
      {Boolean(isShowPostDetail) && <PostComment />}
      <Col sm={4} className="flex" onClick={() => showDialog(postItem._id)}>
        <Row>
          <Col className="post-item">
            <div className="post-overlay"></div>

            <div className="content">
              <span className="numtym">
                <Favorite /> {postItem.likes.length}
              </span>
              <span className="numcomment">
                <ChatBubble /> {postItem.comments.length}
              </span>
            </div>
            {postItem.images[0].split('.')[postItem.images[0].split('.').length - 1] === 'mp4' ? (
              <video className="post-image" src={postItem.images[0]}></video>
            ) : (
              <img className="post-image" src={postItem.images[0]} alt="image" />
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PostItem;
