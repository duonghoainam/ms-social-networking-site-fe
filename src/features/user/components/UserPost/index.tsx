import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';

import './styles.scss';
import { useUserPost } from './useUserPost';

const UserPost = (): ReactElement => {
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
