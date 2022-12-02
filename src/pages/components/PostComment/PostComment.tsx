import React, { ReactElement } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddComment from '../AddComment/AddComment';
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import PostHeader from '../PostHeader/PostHeader';
import ListComment from '../ListComment';
import AllLikesPopup from '../AllLikesPopup/AllLikesPopup';
import { format } from 'timeago.js';
import { Favorite, FavoriteBorderOutlined, SendOutlined } from '@material-ui/icons';
import CommentSkeleton from '../../../components/skeletonLoading/CommentSkeleton';
import { usePostComment } from './usePostComment';
import MessagePopup from '../../chat/components/MessagePopup/MessagePopup';
// import { socket } from '../../../App';

const PostComment = ({
  isShowPostDetail,
  hideDetail,
  selectedPost,
  handleLikePost
}: any): ReactElement => {
  const {
    isLike,
    setIsLike,
    likeCount,
    setLikeCount,
    isShowMessagePopup,
    setIsShowMessagePopup,
    isShowAllLikesPopup,
    showAllLikesPopup,
    hideAllLikesPopup
  } = usePostComment(selectedPost);
  const postState = { isLike, setIsLike, likeCount, setLikeCount };
  return (
    <div className="detail" style={{ display: (isShowPostDetail as boolean) ? '' : 'none' }}>
      <div className="detail__layout" onClick={hideDetail}></div>
      <div className="detail__content">
        <div className="detail__content__img">
          <Carousel
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}>
            {selectedPost.images?.map((image: any, index: number) => {
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
            {selectedPost !== null ? <ListComment /> : <CommentSkeleton />}
          </div>

          <div className="detail__content__comment__footer">
            <div className="react">
              <Row>
                <Col className="postItem__react">
                  <Row className="reactIcon">
                    <Col md={9}>
                      {(isLike as boolean) ? (
                        <Favorite
                          style={{ color: '#ed4956' }}
                          onClick={() => handleLikePost('id', postState)}
                        />
                      ) : (
                        <FavoriteBorderOutlined
                        // onClick={() => handleLikePost(selectedPostId, selectedPost.user._id)}
                        />
                      )}

                      <SendOutlined onClick={() => setIsShowMessagePopup(true)} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="postItem__content__likes" onClick={showAllLikesPopup}>
              {likeCount} lượt thích
            </div>
            <div className="postItem__content__caption">{selectedPost.content}</div>

            <div className="postItem__content__time">{format(selectedPost.createdAt)}</div>
            <AddComment postId={1} userPostId={selectedPost.user._id} />
          </div>
        </div>
      </div>
      <div className="detail__icon" onClick={hideDetail}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      {(isShowAllLikesPopup as boolean) && (
        <AllLikesPopup isShow={isShowAllLikesPopup} hidePopup={hideAllLikesPopup} />
      )}
      {(isShowMessagePopup as boolean) && (
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
