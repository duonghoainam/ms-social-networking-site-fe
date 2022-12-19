import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';

import { usePostHeader } from './usePostHeader';
const PostHeader = ({ post }: any): ReactElement => {
  const { handleShowProfile } = usePostHeader();
  return (
    <Row>
      <Col md={1} onClick={() => handleShowProfile(post.user.id)}>
        <img src={post.user.avatar} alt="avatar" />
      </Col>
      <Col md={9} onClick={() => handleShowProfile(post.user.id)}>
        <h6>{post.user.name}</h6>
      </Col>
    </Row>
  );
};

export default PostHeader;
