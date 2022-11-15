import React, { ReactElement, useState } from 'react';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import Header from '../../../components/header/Header';
import Category from '../components/category';
import PostItem from '../components/postItem';
import { useSelector } from 'react-redux';
import './homePage.scss';
import ErrorFetch from '../../../components/fetchfail/error';
import AlllikesPopup from '../components/commons/allLikesPopup';
import HomeSkeleton from '../../../components/skeletonLoading/HomeSkeleton';
import { AppState } from '../../../app/state.type';

const HomePage = (): ReactElement => {
  const [showB, setShowB] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // const [isShowPopup, setIsShowPopup] = useState(false);

  const toggleShowB = (): void => setShowB(!showB);
  // const current = JSON.parse(localStorage.getItem('login') ?? '');
  // const dispatch = useAppDispatch();
  const { listPosts, isLoading, loadListPostFail } = useSelector((state: AppState) => state.home);

  // useEffect(async () => {
  //   document.title = 'Midori';
  //   const action = getPosts();
  //   await dispatch(action).unwrap();

  //   const action2 = getNotification();
  //   await dispatch(action2).unwrap();

  //   const action1 = getListRecommendFriends();
  //   await dispatch(action1).unwrap();

  //   setRefresh(!refresh);

  //   socket.emit('joinNotificationRoom', current._id);
  // }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <div className="toastMessage">
        <Toast onClose={toggleShowB} show={showB}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Thông báo</strong>
            <small>11s ago</small>
          </Toast.Header>
          <Toast.Body>Có ai đó mới comment bài viết của bạn</Toast.Body>
        </Toast>
      </div>
      <Container style={{ marginTop: '100px' }}>
        {(loadListPostFail as boolean) ? (
          <Row>
            <ErrorFetch />
          </Row>
        ) : (
          <Row>
            {(isLoading as boolean) ? (
              <HomeSkeleton />
            ) : (
              <>
                <Col md={{ span: 7 }}>
                  {listPosts.map((post: any) => {
                    return (
                      <PostItem
                        key={post._id}
                        postId={post._id}
                        content={post}
                        // isShowPopup={isShowPopup}
                        // setIsShowPopup={setIsShowPopup}
                      />
                    );
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
      <AlllikesPopup />
    </>
  );
};

export default HomePage;
