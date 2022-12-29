import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Delete, Edit } from '@material-ui/icons';
import './styles.scss';
import usePostItem from './usePostItem';

const PostItem = ({ post }: any): ReactElement => {
  const { handleClickPost, openEditPost, openDeletePost } = usePostItem(post);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  return (
    <>
      <Col sm={4} className="flex" onClick={() => { void handleClickPost() }}>
        <Row>
          <Col className="post-item">
            <div className="post-overlay"></div>

            {currentUser.id === post.user.id && <div className="content">
              <span className="editIcon" onClick={(event) => { void openEditPost(event) }}>
                <Edit />
              </span>
              <span className="deleteIcon" onClick={(event) => { void openDeletePost(event) }}>
                <Delete />
              </span>
            </div>}
            {post.images.length === 0 ? <div className="no-image"></div> : <div>
              {
                post.images[0].split('.')[post.images[0].split('.').length - 1] === 'mp4' ? (
                  <video className="post-image" src={post.images[0]}></video>
                ) : (
                  <img className="post-image" src={post.images[0]} alt="image" />
                )
              }
            </div>}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PostItem;
