import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ChatContent from './components/ChatContent/ChatContent';
import DefaultContent from './components/DefaultContent/DefaultContent';
import ListChat from './components/ListChat/ListChat';
import MessagePopup from './components/MessagePopup/MessagePopup';
import { useChatPage } from './hooks/useChatPage';

function ChatPage (): any {
  const { isOpenSetting, setIsOpenSetting, isShowPopup, setIsShowPopup } = useChatPage();
  return (
		<>
			<Container fluid>
				<Row>
					<Header></Header>
				</Row>
			</Container>
			<Container style={{ marginTop: '100px' }}>
				{isShowPopup && <MessagePopup setIsShowPopup={setIsShowPopup} type="create" />}
				<Row>
					<Col md={{ span: 4, offset: 1 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
						<ListChat setIsOpenSetting={setIsOpenSetting} setIsShowPopup={setIsShowPopup} />
					</Col>
					<Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
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
}

export default ChatPage;
