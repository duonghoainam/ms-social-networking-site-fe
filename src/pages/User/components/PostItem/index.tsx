import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Delete, Edit } from '@material-ui/icons';
import './styles.scss';
import { useAppDispatch } from '../../../../app/store';
import { setSelectedPost, setShowPostDetail, setShowPostEdit } from '../../state/userSlice';
import { getPostComments } from '../../state/userActions';

const PostItem = ({ post }: any): ReactElement => {
  const dispatch = useAppDispatch();

  const handleClickPost = async (): Promise<void> => {
    const selectAction = setSelectedPost(post);
    await dispatch(selectAction);
    const show = setShowPostDetail(true);
    await dispatch(show);
    const getCommentsAction = getPostComments(post._id);
    await dispatch(getCommentsAction).unwrap()
  }
  const openEditPost = async (event: any): Promise<void> => {
    event.stopPropagation();
    const showEdit = setShowPostEdit(true);
    await dispatch(showEdit);
  }
  return (
    <>
      <Col sm={4} className="flex" onClick={() => { void handleClickPost() }}>
        <Row>
          <Col className="post-item">
            <div className="post-overlay"></div>

            <div className="content">
              <span className="editIcon" onClick={(event) => { void openEditPost(event) }}>
                <Edit />
              </span>
              <span className="deleteIcon">
                <Delete />
              </span>
            </div>
            {post.images[0].split('.')[post.images[0].split('.').length - 1] === 'mp4' ? (
              <video className="post-image" src={post.images[0]}></video>
            ) : (
              <img className="post-image" src={post.images[0]} alt="image" />
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PostItem;
