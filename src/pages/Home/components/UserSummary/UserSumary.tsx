import React, { ReactElement } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import './UserSummary.scss';

const UserSummary = ({ user, posts }: any): ReactElement => {
  const POSTS_LIMIT = 3;
  return (
    <div className="summary">
      <Row className="summary_header">
        <Col md={3}>
          <img src={user.avatar} alt="" />
        </Col>
        <Col md={9} className="name">
          {user.name}
        </Col>
      </Row>
      <Row className="summary_breif">
        <Col>
          <p className="num">{posts.length}</p>
          <p>Bài viết</p>
        </Col>
        <Col>
          <p className="num">{user.followers}</p>
          <p>Người theo dõi</p>
        </Col>
        <Col>
          <p className="num">{user.followings}</p>
          <p>Đang theo dõi</p>
        </Col>
      </Row>
      <Row className="summary_image text-center">
        {posts.slice(0, POSTS_LIMIT).map((item: any, index: number) => {
          return (
            <Col key={index}>
              <img src={item.images[0]} alt="" />
            </Col>
          )
        })}
      </Row>
    </div>
  );
};

export default UserSummary;
