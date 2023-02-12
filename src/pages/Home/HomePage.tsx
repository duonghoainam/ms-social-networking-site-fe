import React, { ReactElement, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/state.type';
import Header from '../../components/Header/Header';
import AllLikesPopup from '../../components/AllLikesPopup/AllLikesPopup';
import PostComment from '../../components/PostComment/PostComment';
import { useHomePage } from './hooks/useHomePage';
import { usePostComment } from './hooks/usePostComment';
import { usePostItem } from './hooks/usePostItem';
import PostItem from './components/PostItem/PostItem';
import Category from './components/Category/Category';
import { addNewComment } from './state/homeActions';
import LazyLoad from 'react-lazyload';
import PostSkeleton from '../../components/SkeletonLoading/PostSkeleton';
import { useAppDispatch } from '../../app/store';
import InfinitePostList from './components/InfinitePostList/InfinitePostList';

const HomePage = (): ReactElement => {

  useHomePage();

  const {listComment, loadListPostFail } = useSelector((state: AppState) => {
    return state.home;
  });
  const { isShowPostDetail, selectedPost } = useSelector((state: AppState) => state.home);
  const { hideDetail, handleLikePostComment } = usePostComment();

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: '100px' }}>
        {(loadListPostFail as boolean) ? (
          <Row>
            <div>Error</div>
          </Row>
        ) : (
          <Row>
            <Col md={{ span: 7 }}>
              <InfinitePostList/>
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <Category />
            </Col>
          </Row>
        )}
      </Container>
      {(isShowPostDetail as boolean) && (
        <PostComment
          isShowPostDetail={isShowPostDetail}
          selectedPost={selectedPost}
          hideDetail={hideDetail}
          handleLikePost={handleLikePostComment}
          comments={listComment}
          addCommentAction={addNewComment}
        />
      )}
      <AllLikesPopup />
      <div id="observer-target"></div>
    </>
  );
};

export default HomePage;
