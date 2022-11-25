import React, { ReactElement } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

const UserSummary = ({ user }: any): ReactElement => {
  const posts: any[] = [];
  const isLoading = true;
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
          <p className="num">{user.followers.length}</p>
          <p>Người theo dõi</p>
        </Col>
        <Col>
          <p>Đang theo dõi</p>
          <p className="num">{user.following.length}</p>
        </Col>
      </Row>
      <Row className="summary_image text-center">
        {(isLoading as boolean) ? (
          <Spinner animation="grow" variant="success" />
        ) : (
          <>
            {posts.map((item: any, index: number) => {
              if (index < 3) {
                return (
                  <Col key={index}>
                    <img src={item.images[0]} alt="" />
                  </Col>
                );
              }
              return null;
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default UserSummary;
