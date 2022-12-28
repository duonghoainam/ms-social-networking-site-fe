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

const UserPost = (): ReactElement => {
  const { isShowPostDetail, isShowPostEdit, selectedPost, comments, posts } = useSelector((state: AppState) => state.user)
  const { hidePostDetail, handleLikePostComment } = useUserPost();
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
      {Boolean(isShowPostEdit) && <EditPostPopup post={selectedPost}/>}
    </Container>
  );
};

export default UserPost;
