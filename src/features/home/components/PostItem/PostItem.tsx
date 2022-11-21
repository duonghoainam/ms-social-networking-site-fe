import React, { ReactElement, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import './PostItem.scss';
// import { useSelector } from 'react-redux';
// import {
//   createNotification,
//   getCommentsByPostID,
//   getListUser,
//   handleLike,
//   handleUnLike,
//   ShowDetail
// } from '../../homeSlice';

import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined
} from '@material-ui/icons';
import PostHeader from '../PostHeader';
import { format } from 'timeago.js';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

// import ReportModal from '../reportModal';
// import { socket } from '../../../../App';
import MessagePopup from '../../../chat/components/MessagePopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { handleLike, handleUnLike } from '../../homeSlice';
// import { AppState } from '../../../../app/state.type';
// import { useAppDispatch } from '../../../../app/store';
import ReportModal from '../ReportModal';

const PostItem = ({ post }: any): ReactElement => {
  // const dispatch = useAppDispatch();
  // const captionRef = useRef();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const [isShowMessagePopup, setIsShowMessagePopup] = useState(false);

  // hàm xử lý show phần comment khi show tất cả phần comment

  // const showDetail = (a): void => {
  //   const action1 = getCommentsByPostID(post._id);
  //   dispatch(action1);

  //   const action = ShowDetail(post._id);
  //   dispatch(action);

  //   // const message = { room: a };
  //   // socket.emit('joinComment', a);
  // };
  // phần react
  // const { listPosts } = useSelector((state: AppState) => state.home);

  // get list like of the post
  // const activePost = listPosts.find((post) => post._id === post._id);
  // const likes = activePost.likes;

  // const isOverflow = (): void => {
  //   return captionRef?.current?.offsetHeight < captionRef?.current?.scrollHeight;
  // };
  // // hàm xử lý show phần comment khi show tất cả phần comment

  // // hàm xử lý like hay không like bài post
  // const handleLikePost = async (id: string, userid: string): Promise<void> => {
  //   if (post.likes.includes(currentUser._id) as boolean) {
  //     const action1 = handleUnLike(id);
  //     await dispatch(action1).unwrap();
  //   } else {
  //     const action1 = handleLike(id);
  //     await dispatch(action1).unwrap();

  //     if (userid !== currentUser._id) {
  //       const paramsCreate = {
  //         receiver: userid,
  //         notiType: 2,
  //         desId: post._id
  //       };

  //       const action = createNotification(paramsCreate);
  //       await dispatch(action).unwrap();
  //       const notification = {
  //         id: post._id,
  //         userId: userid, // cái này là id của thằng cần gửi thông báo tới
  //         type: 2,
  //         senderName: currentUser.name,
  //         img: currentUser.avatar
  //       };
  //       socket.emit('send_notificaton', notification);
  //     }
  //   }
  // };

  // const showAllLikesModel = async (a): Promise<void> => {
  //   const action = getListUser(a);
  //   await dispatch(action).unwrap();
  // };

  // const handleWatchMore = (e) => {
  //   e.target.previousElementSibling.style.overflow = 'auto';
  //   e.target.previousElementSibling.style.display = 'block';
  //   e.target.style.display = 'none';
  // };
  return (
    <>
      <Row className="postItem">
        <Col md={12} className="postItem__header">
          <PostHeader post={post} />
        </Col>
        <Col md={12} className="postItem__slide">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}>
            {post.images.map((image: string, index: number) => {
              return (
                <Carousel.Item key={index}>
                  {image.split('.')[image.split('.').length - 1] === 'mp4' ? (
                    <video height="500" width="665" controls>
                      <source src={image} type="video/mp4"></source>
                    </video>
                  ) : (
                    <img className="d-block w-100" src={image} alt="First slide" />
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col className="postItem__react">
          <Row className="reactIcon">
            <Col md={9}>
              {post.likes.includes(currentUser._id) === true ? (
                <Favorite
                  style={{ color: '#ed4956' }}
                  // onClick={async () => await handleLikePost(post._id)}
                />
              ) : (
                <FavoriteBorderOutlined
                // onClick={async () => await handleLikePost(post._id, post.user._id)}
                />
              )}

              <AddCommentOutlined
              // onClick={() => showDetail(post._id)}
              />

              <SendOutlined onClick={() => setIsShowMessagePopup(true)} />
            </Col>
            <Col md={3} style={{ textAlign: 'right' }}>
              <BookmarkBorderOutlined />
            </Col>
          </Row>
        </Col>
        <Col md={12} className="postItem__post">
          <div className="postItem__post__likes">{post.likes.length} lượt thích</div>
          <div className="postItem__post__caption">{post.content}</div>
          {/* {isOverflow() && (
            <span className="postItem__post__watchMoreBtn" onClick={(e) => handleWatchMore(e)}>
              Xem thêm
            </span>
          )} */}
          <div
            className="postItem__post__allCmt"
            // onClick={() => showDetail(post._id)}
          >
            Xem tất cả {post.comments.length} bình luận
          </div>
          <div className="postItem__post__time">{format(post.createdAt)}</div>
        </Col>
        <ReportModal postId={post.user._id} />
      </Row>
      {isShowMessagePopup && (
        <MessagePopup
          setIsShowPopup={setIsShowMessagePopup}
          type="forward"
          content={{ text: post._id, messType: 'post' }}
          setIsOpenSetting={undefined}
        />
      )}
    </>
  );
};

export default PostItem;
