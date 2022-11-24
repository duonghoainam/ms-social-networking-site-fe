import React, { ReactElement, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

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

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  // const { isShowDetail, isLoadCmt, activePostId, listPosts, post } = useSelector(
  //   (state: AppState) => state.home
  // );

  const activePost: any = {
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
  };
  // if (Object.keys(post).length === 0) {
  //   console.log('Lấy post trong main');
  //   activePost = listPosts.find((post: any) => post._id === activePostId);
  //   console.log(activePost);
  // } else {
  //   activePost = post;
  // }

  const [isLike]: [boolean, any] = useState(true);
  const [numLikes]: [number, any] = useState(activePost.likes.length);

  const HideDetail = (): void => {
    // const action = HideDetailReducer(null);
    // dispatch(action);
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

  //     if (userId !== currentUser._id) {
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
  //         senderName: currentUser.name,
  //         img: currentUser.avatar
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
    <div
      className="detail"
      // style={{ display: (isShowDetail as boolean) ? '' : 'none' }}
    >
      <div
        className="detail__layout"
        // onClick={HideDetail}
      ></div>
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
            <PostHeader post={null} />
          </div>
          <div className="detail__content__comment__body">
            {activePost !== null ? <ListComment /> : <CommentSkeleton />}
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
            <AddComment postId={1} userPostId={activePost.user._id} />
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
          content={{ text: 1, messType: 'post' }}
          setIsOpenSetting={undefined}
        />
      )}
    </div>
  );
};

export default PostComment;
