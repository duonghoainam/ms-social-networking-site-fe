import React, { ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './AccountItem.scss';
import { useAccountItem } from './useAccountItem';

const AccountItem = ({ user }: any): ReactElement => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  const { handleFollow, isFollow } = useAccountItem(user);
  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={user.avatar} alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user.name}</p>
          <p className="accountItem_name_realname">info...</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        {currentUser.id !== user.id ? <Button
          size="sm"
          onClick={() => handleFollow()}
        >
          {(Boolean(isFollow)) ? 'Bỏ theo dõi' : 'Theo dõi'}
        </Button> : <></>}
      </Col>
    </Row>
  );
};

export default AccountItem;
