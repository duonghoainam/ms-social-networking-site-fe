import React, { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import NewPostContent from '../../../NewPost/components/NewPostContent';
import NewPostImage from '../../../NewPost/components/NewPostImage/NewPostImage';
import './EditPostPopup.scss'
import useEditPostPopup from './useEditPostPopup';

const EditPostPopup = ({ post }: any): ReactElement => {
  const { isShowPostEdit } = useSelector((state: AppState) => state.user);
  const { hideEditPost, listImage, setListImages, valueInput, setValueInput, handleEditPost } = useEditPostPopup(post);
  return (
    <div className="edit" style={{ display: (isShowPostEdit as boolean) ? '' : 'none' }}>
      <div className="edit__layout" onClick={() => { void hideEditPost() }}></div>
      <Container fluid className="edit__content">
        <Row>
          <Col className="newWrapper">
            <Row>
              <div className="newHeader">
                <h6>Edit your post</h6>
                <button onClick={() => { void handleEditPost() }}>
                  Edit
                </button>
              </div>
            </Row>
            <Row>
              <Col md={7} className="newImgWrapper">
                <NewPostImage listImage={listImage} setListImages={setListImages} />
              </Col>
              <Col md={5}>
                <NewPostContent valueInput={valueInput} setValueInput={setValueInput} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditPostPopup;
