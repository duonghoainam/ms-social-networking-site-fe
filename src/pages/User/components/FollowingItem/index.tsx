import React, { ReactElement } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';
import { useFollowingItem } from './useFollowingItem';

const FollowingItem = ({ user, setShowModal }: any): ReactElement => {
  const {
    currentUser,
    handleUnFollow,
    handleDirectToAccount
  } = useFollowingItem({ user, setShowModal });

  return (
    <Row className="accountItem" onClick={(e) => handleDirectToAccount(e)}>
      <Col md={{ span: 1 }}>
        <img src="" alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{currentUser.name}</p>
          <p className="accountItem_name_realname">email</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        {currentUser.id === user.id && (
          <Button onClick={(e) => handleUnFollow(e)} size="sm">
            Bỏ theo dõi
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowingItem;
