/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { ReactElement } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './PostItem.scss';
import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined
} from '@material-ui/icons';
import PostHeader from '../PostHeader/PostHeader';
import { format } from 'timeago.js';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePostItem } from './usePostItem';
import AllLikesPopup from '../../../../components/AllLikesPopup/AllLikesPopup';
import { useAllLikesPopup } from '../../../../components/AllLikesPopup/useAllLikesPopup';
import MessagePopup from '../../../Chat/components/MessagePopup/MessagePopup';
import { getFileTypeFromUrl } from '../../../../utils/string.util';
import { AppState } from '../../../../app/state.type';
import { setGridView } from '../../../Home/state/homeSlice';
import { useAppDispatch } from '../../../../app/store';

import {
  faCircleXmark,
  faMapLocation
} from '@fortawesome/free-solid-svg-icons';
/**
 * post params are logic for to manage state, call data for a post item
 * @param post post data
 * @param setSelectedPost set current post to state
 * @param setShowPostDetail show/hide post detail
 * @param getComments call api to get post comments and set state
 * @returns
 */
const PostItem = ({ post, handleLikePost, showDetail }: any): ReactElement => {
  const { currentUser, setIsShowMessagePopup, isShowMessagePopup } = usePostItem(post);
  const { isShowAllLikesPopup, hideAllLikesPopup, showAllLikesPopup } = useAllLikesPopup({ post });
  const { latitude, longitude, weather, isGridView } = useSelector((state: AppState) => state.home);
  const dispatch = useAppDispatch();
  
  function handleDateData(timestamp: any): React.ReactNode {
    var date = new Date(timestamp * 1000);
    var formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' });
    console.log(formattedDate);
    return formattedDate;
  }
  
  return (
    <>
      <Row className="postItem">
        <Col md={12} className="postItem__header">
          <PostHeader post={post} />
        </Col>
        <Col md={12} className="postItem__slide">
            {(!isGridView) && (<Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}>
            {post.images.map((fileUrl: string, index: number) => {
              return (
                <Carousel.Item key={index}>
                  {getFileTypeFromUrl(fileUrl) === 'video' ? (
                    <video style={{ height: '100%', width: '100%' }} controls>
                      <source src={fileUrl}></source>
                    </video>
                  ) : (
                    <img className="d-block w-100" src={fileUrl} alt="First slide" />
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>)}
          {(isGridView)&&(<section className="business-area__container" data-cursor="-inverse">
              <div className="container-full">
                  <div className="business-area__images">
                    <div className="business-area__images--grid">
                      {(post.images.length >= 1) && (<img className="d-block w-100" src={post.images[0]} alt="First slide" />)}
                      {(post.images.length >= 2) && (<img className="d-block w-100" src={post.images[1]} alt="First slide" />)}
                      {(post.images.length >= 3) && (<img className="d-block w-100" src={post.images[2]} alt="First slide" />)}
                      {(post.images.length == 4) && (<img className="d-block w-100" src={post.images[3]} alt="First slide" />)}
                      {(post.images.length > 4) && 
                      (<div style={{position: "relative"}}>
                        <div style={{position: "absolute", fontSize: "40px", color:"white" ,display:"flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.58)", borderRadius: "14px"}}>
                          +{post.images.length - 4}
                        </div>
                        <img className="d-block w-100" src={post.images[3]} alt="First slide" />
                      </div>)}
                    </div>
                  </div>
              </div>
            </section>)}
        </Col>
        <Col className="postItem__react">
          <Row className="reactIcon">
            <Col md={9}>
              {post.likes.filter((user: any) => user.id === currentUser.id).length > 0 ? (
                <Favorite
                  style={{ color: '#ed4956' }}
                  onClick={async (): Promise<void> => {
                    await handleLikePost(post);
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  onClick={async () => {
                    await handleLikePost(post);
                  }}
                />
              )}
              <AddCommentOutlined onClick={() => showDetail(post)} />
              <SendOutlined
                // onClick={() => setIsShowMessagePopup(true)}
                onClick={() => {
                  navigator.clipboard.writeText(`http://localhost:8000/user/${post.user.id}`);
                  alert('Copied to clipboard')
                }}
              />
            </Col>
            <Col md={3} style={{ textAlign: 'right' }}>
              <BookmarkBorderOutlined  onClick={() => {const hide = setGridView(!isGridView); dispatch(hide);
              }}/>
            </Col>
          </Row>
        </Col>
        <Col md={12} className="postItem__post">
          <div className="postItem__post__likes" onClick={showAllLikesPopup}>
            {post.likes.length} lượt thích
          </div>
          <div className="postItem__post__caption">{post.content}</div>
          <div className="postItem__post__allCmt" onClick={() => showDetail(post)}>
            Xem tất cả {post.comments.length} bình luận
          </div>
          <div className="postItem__post__time">{format(post.createdAt)}</div>
          <FontAwesomeIcon icon={faMapLocation} size="lg" cursor="pointer" /> 
          <a href={`https://maps.google.com?q=${latitude},${longitude}`} target="_blank" className="postItem__post__time">  {weather?.name} - {weather?.sys?.country}</a> 
          {/* if (weather?.weather != null) <div className="postItem__post__time">{weather?.main.temp} {String.fromCharCode(176)}C - wind speed: {weather?.wind?.speed}</div> */}
          <div className="postItem__post__time">{weather?.weather != null? weather?.weather[0]?.main + ' - ' + weather?.weather[0]?.description + ' - ': ''} {weather?.main?.temp} {String.fromCharCode(176)}C - wind speed: {weather?.wind?.speed}</div>
          
          {/* - {} //{handleDateData(weather?.sys?.sunrise)} */}
        </Col>
        {/* <ReportModal postId={post.user._id} /> */}
      </Row>
      {(isShowMessagePopup as boolean) && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="forward"
          content={{ text: post._id, messType: 'post' }}
          setIsOpenSetting={undefined}
        />
      )}
      {(isShowAllLikesPopup as boolean) && (
        <AllLikesPopup post={post} isShow={isShowAllLikesPopup} hidePopup={hideAllLikesPopup} />
      )}
    </>
  );
};

export default PostItem;
