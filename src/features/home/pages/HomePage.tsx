import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import HomeSkeleton from '../../../components/skeletonLoading/HomeSkeleton';
import PostItem from '../components/PostItem/PostItem';

const HomePage = (): ReactElement => {
  // const [showB, setShowB] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // const [isShowPopup, setIsShowPopup] = useState(false);

  // const toggleShowB = (): void => setShowB(!showB);
  // const current = JSON.parse(localStorage.getItem('login') ?? '');
  // const dispatch = useAppDispatch();
  const { listPosts, isLoading, loadListPostFail } = useSelector((state: AppState) => state.home);
  console.log(listPosts);

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
                        postId={post._id}
                        content={post}
                        // isShowPopup={isShowPopup}
                        // setIsShowPopup={setIsShowPopup}
                      />
                    );
                  })}
                </Col>
                <Col md={{ span: 4, offset: 1 }}>{/* <Category /> */}</Col>
              </>
            )}
          </Row>
        )}
      </Container>
      {/* <AlllikesPopup /> */}
    </>
  );
};

export default HomePage;
