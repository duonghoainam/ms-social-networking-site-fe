import React, { ReactElement } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';
import { useFollowerItem } from './useFollowerItem';

const FollowerItem = ({ user, setShowModal }: any): ReactElement => {
  const {
    currentUser,
    handleRemoveFollow,
    handleDirectToAccount
  } = useFollowerItem({ user, setShowModal });

  return (
    <Row className="accountItem" onClick={(e) => handleDirectToAccount(e)}>
      <Col md={{ span: 1 }}>
        <img src={user.avatar} alt="avatar" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user.name}</p>
          <p className="accountItem_name_realname">info...</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        {currentUser.id === user.id && (
          <Button onClick={(e) => handleRemoveFollow(e)} size="sm">
            Hủy theo dõi
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowerItem;
