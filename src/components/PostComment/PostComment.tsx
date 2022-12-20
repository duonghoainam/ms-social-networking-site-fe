import React, { ReactElement } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { usePostComment } from './usePostComment';
import { Favorite, FavoriteBorderOutlined, SendOutlined } from '@material-ui/icons';
import { format } from 'timeago.js';
import MessagePopup from '../../pages/Chat/components/MessagePopup/MessagePopup';
import ListComment from '../../pages/Home/components/ListComment';
import PostHeader from '../../pages/Home/components/PostHeader/PostHeader';
import AllLikesPopup from '../AllLikesPopup/AllLikesPopup';
import { useAllLikesPopup } from '../AllLikesPopup/useAllLikesPopup';
import CommentSkeleton from '../SkeletonLoading/CommentSkeleton';

const PostComment = ({
  isShowPostDetail,
  hideDetail,
  selectedPost,
  handleLikePost
}: any): ReactElement => {
  const {
    currentUser,
    isShowMessagePopup,
    setIsShowMessagePopup
  } = usePostComment();
  const { isShowAllLikesPopup, hideAllLikesPopup, showAllLikesPopup } = useAllLikesPopup({ selectedPost });

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
            <PostHeader post={selectedPost} />
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
                      {selectedPost.likes.filter((user: any) => user.id === currentUser.id).length > 0 ? (
                        <Favorite
                          style={{ color: '#ed4956' }}
                          onClick={() => handleLikePost(selectedPost._id, currentUser.id)}
                        />
                      ) : (
                        <FavoriteBorderOutlined
                          onClick={() => handleLikePost(selectedPost._id, currentUser.id)}
                        />
                      )}
                      <SendOutlined
                      // onClick={() => setIsShowMessagePopup(true)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="postItem__content__likes" onClick={showAllLikesPopup}>
              {selectedPost.likes.length} lượt thích
            </div>
            <div className="postItem__content__caption">{selectedPost.content}</div>

            <div className="postItem__content__time">{format(selectedPost.createdAt)}</div>
            {/* <AddComment postId={selectedPost._id} postUserId={selectedPost.user.id} /> */}
          </div>
        </div>
      </div>
      <div className="detail__icon" onClick={hideDetail}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
      {(isShowAllLikesPopup as boolean) && (
        <AllLikesPopup post={selectedPost} isShow={isShowAllLikesPopup} hidePopup={hideAllLikesPopup} />
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
