import React, { ReactElement, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import HomeSkeleton from '../../../components/skeletonLoading/HomeSkeleton';
import PostItem from '../components/PostItem/PostItem';
import Category from '../components/Category';
import AllLikesPopup from '../components/commons/AllLikesPopup';
import { useAppDispatch } from '../../../app/store';
import { getPosts } from '../homeSlice';

const HomePage = (): ReactElement => {
  // const [isShowPopup, setIsShowPopup] = useState(false);

  // const current = JSON.parse(localStorage.getItem('login') ?? '');
  const dispatch = useDispatch();
  const { listPosts, isLoading } = useSelector((state: any) => {
    console.log(state.home);
    return state.home;
  });
  useEffect(() => {
    // const action = getPosts();
    // dispatch(action);

    // const action2 = getNotification();
    // await dispatch(action2).unwrap();

    // const action1 = getListRecommendFriends();
    // await dispatch(action1).unwrap();

    // socket.emit('joinNotificationRoom', current._id);
  }, [listPosts]);
  console.log(listPosts);

  return (
    <>
      {/* <Container fluid>
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
                  {listPosts.map((post: any) => {
                    return (
                      <PostItem
                        key={post._id}
                        post={post}
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
      <AllLikesPopup /> */}
    </>
  );
};

export default HomePage;
