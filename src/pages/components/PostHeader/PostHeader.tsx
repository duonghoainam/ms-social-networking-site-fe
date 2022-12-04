import React, { ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';

import { usePostHeader } from './usePostHeader';
const PostHeader = ({ post }: any): ReactElement => {
  const { handleShowProfile } = usePostHeader();
  return (
    <Row>
      <Col md={1} onClick={() => handleShowProfile(post.userInfo.id)}>
        <img src="" alt="" />
      </Col>
      <Col md={9} onClick={() => handleShowProfile(post.userInfo.id)}>
        <h6>{post.userInfo.name}</h6>
      </Col>
    </Row>
  );
};

export default PostHeader;
