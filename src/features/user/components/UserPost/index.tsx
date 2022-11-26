import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPostsByUserId } from '../../profileSlice';
import PostItem from '../PostItem';

import './styles.scss';
import { useUserPost } from './useUserPost';

const UserPost = (): ReactElement => {
  // const dispatch = useDispatch();
  // const activeId = useSelector((state) => state.user.activeId);
  // const posts = useSelector((state) => state.user.posts);
  // useEffect(async () => {
  //   const action = getPostsByUserId(activeId);
  //   await dispatch(action);
  // }, [activeId]);

  const { posts } = useUserPost();

  return (
    <Container>
      <Row className="container">
        {posts.length > 0 &&
          posts
            .slice()
            .reverse()
            .map((item: any, index: any) => <PostItem key={index} post={item} />)}
      </Row>
    </Container>
  );
};

export default UserPost;
