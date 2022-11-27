import React, { ReactElement } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';
import { useFollowingItem } from './useFollowingItem';

const FollowingItem = (props: { user: any, setShowModal: any }): ReactElement => {
  const {
    name,
    avatar,
    email,
    authUserId,
    currentUserId,
    handleUnFollow,
    handleDirectToAccount
  } = useFollowingItem(props.user, props.setShowModal);

  return (
    <Row className="accountItem" onClick={(e) => handleDirectToAccount(e)}>
      <Col md={{ span: 1 }}>
        <img src={avatar} alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{name}</p>
          <p className="accountItem_name_realname">{email}</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        {authUserId === currentUserId && (
          <Button onClick={(e) => handleUnFollow(e)} size="sm">
            Bỏ theo dõi
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowingItem;
