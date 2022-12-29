import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import PostComment from '../../../../components/PostComment/PostComment';
import './styles.scss';
import useUserPost from './useUserPost';
import { addNewComment } from '../../state/userActions';
import EditPostPopup from '../EditPostPopup/EditPostPopup';
import WarningPopup from '../../../../components/WarningPopup/WarningPopup';

const UserPost = (): ReactElement => {
  const { isShowPostDetail, isShowPostEdit, isShowDeletePopup, selectedPost, comments, posts } = useSelector((state: AppState) => state.user)
  const { hidePostDetail, handleLikePostComment, handleCancelDelete, handleDeletePost } = useUserPost();
  return (
    <Container>
      <Row className="container">
        {posts.length > 0 &&
          posts
            .slice()
            .reverse()
            .map((item: any, index: any) => <PostItem key={index} post={item} />)}
      </Row>
      {Boolean(isShowPostDetail) && <PostComment
        isShowPostDetail={isShowPostDetail}
        hideDetail={hidePostDetail}
        selectedPost={selectedPost}
        comments={comments}
        handleLikePost={handleLikePostComment}
        addCommentAction={addNewComment}
      />}
      {Boolean(isShowPostEdit) && <EditPostPopup post={selectedPost} />}
      {Boolean(isShowDeletePopup) && <WarningPopup
        title="Xóa bài post"
        content="Bạn có chắc muốn xóa bài post?"
        handleCancel={() => { void handleCancelDelete() }}
        handleAccept={() => { void handleDeletePost() }}
      />}
    </Container>
  );
};

export default UserPost;
