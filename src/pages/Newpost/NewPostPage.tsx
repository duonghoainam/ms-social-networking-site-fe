import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NewPostContent from './components/NewPostContent';
import NewPostHeader from './components/NewPostHeader';
import NewPostImage from './components/NewPostImage';
import useNewPostPage from './hooks/useNewPostPage';
import './NewPostPage.scss';

const NewPage = (): ReactElement => {
  const location = useLocation();
  const post = location.state?.post;
  const {
    listImages,
    setListImages,
    valueInput,
    setValueInput
  } = useNewPostPage(post);
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
							<NewPostHeader
								listImages={listImages}
								content={valueInput}
								isUpdate={post !== null }
								postId={post?._id}
							/>
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
  )
};

export default NewPage;
