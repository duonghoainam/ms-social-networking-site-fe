import React, { ReactElement, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/state.type';
import AllLikesPopup from '../../components/AllLikesPopup/AllLikesPopup';
import Header from '../../components/Header/Header';
import PostComment from '../../components/PostComment/PostComment';
import { setLat, setLon, setWeather } from '../../pages/Home/state/homeSlice';
import './HomePage.scss';
import Category from './components/Category/Category';
import InfinitePostList from './components/InfinitePostList/InfinitePostList';
import { useHomePage } from './hooks/useHomePage';
import { usePostComment } from './hooks/usePostComment';
import { addNewComment } from './state/homeActions';
import { useAppDispatch } from '../../../src/app/store';

const HomePage = (): ReactElement => {
  const dispatch = useAppDispatch();

  useHomePage();

  function success(position: { coords: { latitude: Number; longitude: Number; }; }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const lat = setLat(position.coords.latitude);
    dispatch(lat);
    const lon = setLon(position.coords.longitude);
    dispatch(lon);
    // setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // Make API call to OpenWeatherMap
    fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3939e70924ddd1b2d6be0af2eadbe89c&units=metric`)
      .then(response => response.json())
      .then(data => {
        const hide = setWeather(data);
        dispatch(hide);

        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  } 
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, [navigator.geolocation])

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
