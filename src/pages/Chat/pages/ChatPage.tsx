import React, { ReactElement, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import ListChat from '../components/ListChat/ListChat';
import ChatContent from '../components/ChatContent/ChatContent';
import DefaultContent from '../components/DefaultContent/DefaultContent';

const ChatPage = (): ReactElement => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: '100px' }}>
        <Row>
          <Col md={{ span: 4, offset: 1 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
            <ListChat
              setIsOpenSetting={setIsOpenSetting}
              isShowPopup={isShowPopup}
              setIsShowPopup={setIsShowPopup}
            />
          </Col>
          <Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
            {/* <DefaultContent /> */}
            <Routes>
              <Route index path="/" element={<DefaultContent />} />
              <Route
                path="/:id"
                element={
                  <ChatContent
                    setIsOpenSetting={setIsOpenSetting}
                    isOpenSetting={isOpenSetting}
                  />
                }
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;
