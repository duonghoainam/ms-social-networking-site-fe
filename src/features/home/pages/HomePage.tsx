import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import HomeSkeleton from '../../../components/skeletonLoading/HomeSkeleton';
import PostItem from '../components/PostItem/PostItem';
import PostComment from '../components/PostComment';

const HomePage = (): ReactElement => {
  // const [showB, setShowB] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // const [isShowPopup, setIsShowPopup] = useState(false);

  // const toggleShowB = (): void => setShowB(!showB);
  // const current = JSON.parse(localStorage.getItem('login') ?? '');
  // const dispatch = useAppDispatch();
  let { listPosts, isLoading, loadListPostFail } = useSelector((state: AppState) => state.home);
  listPosts = [
    {
      _id: 1,
      content: 'my post',
      images: [
        'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      ],
      likes: [],
      comments: [],
      user: {
        _id: 1,
        avatar:
          'https://images.pexels.com/photos/1554613/pexels-photo-1554613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: 'thuan'
      },
      createdAt: Date.now()
    }
  ];
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
                  {/* {listPosts.map((post: any) => {
                    return (
                      <PostItem
                        key={post._id}
                        post={post}
                        // isShowPopup={isShowPopup}
                        // setIsShowPopup={setIsShowPopup}
                      />
                    );
                  })} */}
                  <PostComment />
                </Col>
                <Col md={{ span: 4, offset: 1 }}>{/* <Category /> */}</Col>
              </>
            )}
          </Row>
        )}
      </Container>
      {/* <AllLikesPopup /> */}
    </>
  );
};

export default HomePage;
