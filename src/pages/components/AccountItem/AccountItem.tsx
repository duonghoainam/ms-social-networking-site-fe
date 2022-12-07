import React, { ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './AccountItem.scss';

const AccountItem = ({ user }: any): ReactElement => {
  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src="" alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user.name}</p>
          <p className="accountItem_name_realname">info...</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        <Button
          size="sm"
          // onClick={() => handleFollow(user[0]._id)}
        >
          {/* {IsFollow ? 'Bỏ theo dõi' : 'Theo dõi'} */}
          Theo dõi
        </Button>
      </Col>
    </Row>
  );
};

export default AccountItem;
