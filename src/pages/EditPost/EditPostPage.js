import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { getNotification } from '../Home/state/homeSlice';
import UpdatePostHeader from './components/EditPostHeader';
import NewPostContent from '../NewPost/components/newPostContent';
import NewPostImage from '../NewPost/components/newPostImage';
import './newpage.scss';

const EditPage = () => {
  const dispatch = useDispatch();
  const { _id, images, content } = useSelector((state) => state.home.post);

  const [listImages, setListImages] = useState(images);
  const [valueInput, setValueInput] = useState(content);

  useEffect(async () => {
    let action2 = getNotification();
    await dispatch(action2).unwrap();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: '115px' }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="newWrapper">
            <Row>
              <UpdatePostHeader listImages={listImages} content={valueInput} postId={_id} />
            </Row>
            <Row>
              <Col md={7} className="newImgWrapper">
                <NewPostImage listImages={listImages} setListImages={setListImages} />
              </Col>
              <Col md={5}>
                <NewPostContent valueInput={valueInput} setValueInput={setValueInput} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPage;
