import React, { ReactElement, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import {
  // createNotification,
  // handleLike,
  // handleUnLike,
  HideDetailReducer
  // getListUser
} from '../homeSlice';

import AddComment from './AddComment';
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import PostHeader from './PostHeader';
import ListComment from './ListComment';
import AllLikesPopup from './commons/AllLikesPopup';
import CommentSkeleton from '../../../components/skeletonLoading/CommentSkeleton';
import { format } from 'timeago.js';
import { Favorite, FavoriteBorderOutlined, SendOutlined } from '@material-ui/icons';
// import { socket } from '../../../App';
import MessagePopup from '../../chat/components/MessagePopup';
import { AppState } from '../../../app/state.type';
import { useAppDispatch } from '../../../app/store';

const PostComment = (): ReactElement => {
  const dispatch = useAppDispatch();

  const current = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  const { isShowDetail, isLoadCmt, activePostId, listPosts, post } = useSelector(
    (state: AppState) => state.home
  );

  let activePost: any = {};
  if (Object.keys(post).length === 0) {
    console.log('Lấy post trong main');
    activePost = listPosts.find((post: any) => post._id === activePostId);
    console.log(activePost);
  } else {
    activePost = post;
  }

  const [isLike]: [boolean, any] = useState(activePost.likes.includes(current._id));
  const [numLikes]: [number, any] = useState(activePost.likes.length);

  const HideDetail = (): void => {
    const action = HideDetailReducer(null);
    dispatch(action);
  };

  // const handleLikePost = async (id: string, userId: string): Promise<void> => {
  //   setIsLike(!isLike);
  //   if (isLike) {
  //     setNumLikes(--numLikes);
  //     const action1 = handleUnLike(id);
  //     await dispatch(action1).unwrap();
  //   } else {
  //     setNumLikes(++numLikes);
  //     const action1 = handleLike(id);
  //     await dispatch(action1).unwrap();

  //     if (userId !== current._id) {
  //       const paramsCreate = {
  //         receiver: userId,
  //         notiType: 2,
  //         desId: activePostId
  //       };
  //       const action = createNotification(paramsCreate);
  //       await dispatch(action).unwrap();
  //       const notification = {
  //         postId: activePostId,
  //         userId: userId, // cái này là id của thằng cần gửi thông báo tới
  //         type: 2,
  //         senderName: current.name,
  //         img: current.avatar
  //       };
  //       socket.emit('send_notificaton', notification);
  //     }
  //   }
  // };

  // const showAlllikesModal = async (a) => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };

  return (
    <div className="detail" style={{ display: (isShowDetail as boolean) ? '' : 'none' }}>
      <div className="detail__layout" onClick={HideDetail}></div>
      <div className="detail__content">
        <div className="detail__content__img">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}>
            {activePost.images?.map((image: any, index: number) => {
              return (
                <Carousel.Item key={index} style={{ display: 'grid', placeItems: 'center' }}>
                  {image.split('.')[image.split('.').length - 1] === 'mp4' ? (
                    <video
                      style={{ display: 'grid', placeItems: 'center', maxHeight: '100%' }}
                      controls>
                      <source src={image} type="video/mp4"></source>
                    </video>
                  ) : (
                    <img className="d-block w-100" src={image} alt="First slide" />
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="detail__content__comment">
          <div className="detail__content__comment__header postItem__header">
            <PostHeader postId={activePostId} postUser={activePost.user} />
          </div>
          <div className="detail__content__comment__body">
            {!(isLoadCmt as boolean) ? <ListComment /> : <CommentSkeleton />}
          </div>

          <div className="detail__content__comment__footer">
            <div className="react">
              <Row>
                <Col className="postItem__react">
                  <Row className="reactIcon">
                    <Col md={9}>
                      {isLike ? (
                        <Favorite
                          style={{ color: '#ed4956' }}
                          // onClick={() => handleLikePost(activePostId, null)}
                        />
                      ) : (
                        <FavoriteBorderOutlined
                        // onClick={() => handleLikePost(activePostId, activePost.user._id)}
                        />
                      )}

                      <SendOutlined onClick={() => setIsShowMessagePopup(true)} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div
              className="postItem__content__likes"
              // onClick={() => showAlllikesModal(activePost.likes)}
            >
              {numLikes} lượt thích
            </div>
            <div className="postItem__content__caption">{activePost.content}</div>

            <div className="postItem__content__time">{format(activePost.createdAt)}</div>
            <AddComment postId={activePostId} userPostId={activePost.user._id} />
          </div>
        </div>
      </div>
      <div className="detail__icon" onClick={HideDetail}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      <AllLikesPopup />
      {isShowMessagePopup && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="forward"
          content={{ text: activePostId, messType: 'post' }}
          setIsOpenSetting={undefined}
        />
      )}
    </div>
  );
};

export default PostComment;
