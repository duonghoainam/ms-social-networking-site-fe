import React, { ReactElement } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
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
import MessagePopup from '../../../chat/components/MessagePopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReportModal from '../ReportModal';
import { usePostItem } from './usePostItem';

const PostItem = ({ post, showPostComment, setShowPostComment }: any): ReactElement => {
  const { currentUser, handleLikePost, showDetail, setIsShowMessagePopup, isShowMessagePopup } =
    usePostItem({ post, showPostComment, setShowPostComment });
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
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async (): Promise<void> => {
                    await handleLikePost(post._id);
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => {
                    await handleLikePost(post._id, post.user._id);
                  }}
                />
              )}

              <AddCommentOutlined onClick={showDetail} />

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
          <div className="postItem__post__allCmt" onClick={showDetail}>
            Xem tất cả {post.comments.length} bình luận
          </div>
          <div className="postItem__post__time">{format(post.createdAt)}</div>
        </Col>
        <ReportModal postId={post.user._id} />
      </Row>
      {(isShowMessagePopup as boolean) && (
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
