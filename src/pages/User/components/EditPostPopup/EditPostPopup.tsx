import React, { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import NewPostContent from '../../../NewPost/components/NewPostContent';
import NewPostImage from '../../../NewPost/components/NewPostImage';
import { setShowPostEdit } from '../../state/userSlice';
import './EditPostPopup.scss'

const EditPostPopup = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isShowPostEdit } = useSelector((state: AppState) => state.user);
  const hideEditPost = async (): Promise<void> => {
    const showEdit = setShowPostEdit(false);
    await dispatch(showEdit);
  }
  return (
    <div className="edit" style={{ display: (isShowPostEdit as boolean) ? '' : 'none' }}>
      <div className="edit__layout" onClick={() => { void hideEditPost() }}></div>
      <Container fluid className="edit__content">
        <Row>
          <Col className="newWrapper">
            <Row>
              <div className="newHeader">
                <h6>Edit your post</h6>
                <button>
                  Edit
                </button>
              </div>
            </Row>
            <Row>
              <Col md={7} className="newImgWrapper">
                <NewPostImage listImages={[]} />
              </Col>
              <Col md={5}>
                <NewPostContent />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditPostPopup;
