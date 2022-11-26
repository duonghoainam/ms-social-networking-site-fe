import React, { ReactElement } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './AccountItem.scss';
// import { useDispatch } from 'react-redux';
// import { socket } from '../../../../App';
// import { createNotification, follow, unFollow } from '../../homeSlice';

const AccountItem = ({ user }: any): ReactElement => {
  // const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

  // const isFollow = user[0].followers.includes(currentUser._id);

  // const [IsFollow, setIsFollow] = useState(isFollow);

  // const handleFollow = async (id) => {
  //   console.log(id);
  //   if (IsFollow) {
  //     const action = unFollow(id);
  //     await dispatch(action).unwrap();
  //     setIsFollow(false);
  //   } else {
  //     const action1 = follow(id);
  //     await dispatch(action1).unwrap();
  //     setIsFollow(true);
  //     const notification = {
  //       postId: currentUser._id,
  //       userId: user._id,
  //       type: 3,
  //       senderName: currentUser.name,
  //       img: currentUser.avatar
  //     };
  //     socket.emit('send_notificaton', notification);
  //     const paramsCreate = {
  //       receiver: id,
  //       notiType: 3,
  //       desId: currentUser._id
  //     };
  //     const actionCreateNoti = createNotification(paramsCreate);
  //     await dispatch(actionCreateNoti).unwrap();
  //   }
  // };

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
      {currentUser._id === user[0]._id ? (
        <></>
      ) : (
        <Col md={{ span: 4 }}>
          <Button
            size="sm"
            // onClick={() => handleFollow(user[0]._id)}
          >
            {/* {IsFollow ? 'Bỏ theo dõi' : 'Theo dõi'} */}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default AccountItem;
