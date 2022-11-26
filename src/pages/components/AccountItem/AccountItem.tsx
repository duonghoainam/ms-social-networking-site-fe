import React, { ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './AccountItem.scss';

const AccountItem = ({ user }: any): ReactElement => {
  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={user[0].avatar} alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user[0].name}</p>
          <p className="accountItem_name_realname">{user[0].email}</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        <Button
          size="sm"
          // onClick={() => handleFollow(user[0]._id)}
        >
          {/* {IsFollow ? 'Bỏ theo dõi' : 'Theo dõi'} */}
        </Button>
      </Col>
    </Row>
  );
};

export default AccountItem;
