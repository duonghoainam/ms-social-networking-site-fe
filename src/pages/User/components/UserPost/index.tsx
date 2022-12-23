import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import PostComment from '../../../../components/PostComment/PostComment';
import './styles.scss';
import useUserPost from './useUserPost';
import { addNewComment } from '../../state/userActions';

const UserPost = (): ReactElement => {
  const { isShowPostDetail, selectedPost, comments, posts } = useSelector((state: AppState) => state.user)
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
    </Container>
  );
};

export default UserPost;
