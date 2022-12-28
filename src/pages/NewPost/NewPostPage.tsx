import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import NewPostContent from './components/NewPostContent';
import NewPostImage from './components/NewPostImage';
import useNewPostPage from './hooks/useNewPostPage';
import './NewPostPage.scss';

const NewPostPage = (): ReactElement => {
  const {
    listImage,
    setListImages,
    valueInput,
    setValueInput,
    handleCreatePost
  } = useNewPostPage();
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
							<div className="newHeader">
								<h6>Tạo bài viết mới</h6>
								<button className={`${listImage.length === 0 ? 'disabled' : ''}`} onClick={handleCreatePost}>
									Chia sẻ
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
		</>
  )
};

export default NewPostPage;
