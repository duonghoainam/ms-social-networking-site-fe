import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import HomeSkeleton from '../../../components/skeletonLoading/HomeSkeleton';
import PostItem from '../components/PostItem/PostItem';
import Category from '../components/Category';
import AllLikesPopup from '../components/AllLikesPopup/AllLikesPopup';
import { useHomePage } from './useHomePage';
import PostComment from '../components/PostComment/PostComment';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';

const HomePage = (): ReactElement => {
  const { showPostDetail } = useSelector((state: AppState) => state.home);
  const { listPost, isLoading, loadListPostFail } = useHomePage();
  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
        <ToastContainer />
      </Container>
      <Container style={{ marginTop: '100px' }}>
        {(loadListPostFail as boolean) ? (
          <Row>
            <div>Error</div>
          </Row>
        ) : (
          <Row>
            {(isLoading as boolean) ? (
              <HomeSkeleton />
            ) : (
              <>
                <Col md={{ span: 7 }}>
                  {listPost.map((post: any, index: number) => {
                    return <PostItem key={index} post={post} />;
                  })}
                </Col>
                <Col md={{ span: 4, offset: 1 }}>
                  <Category />
                </Col>
              </>
            )}
          </Row>
        )}
      </Container>
      {(showPostDetail as boolean) && <PostComment />}
      <AllLikesPopup />
    </>
  );
};

export default HomePage;
