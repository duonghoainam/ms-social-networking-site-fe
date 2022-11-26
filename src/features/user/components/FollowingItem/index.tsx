import React, { ReactElement } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import './styles.scss';
import { useFollowingItem } from './useFollowingItem';

const FollowingItem = (user: any, setShowModal: any): ReactElement => {
  // const { _id, name, avatar, email } = user;
  // const dispatch = useDispatch();

  // const authUserId = useSelector((state) => state.auth.current._id);
  // const currentUserId = useSelector((state) => state.user.userInfo._id);

  // const handleUnFollow = async (e): any => {
  //   e.stopPropagation();
  //   console.log(_id);
  //   const action = unFollow(_id);
  //   await dispatch(action).unwrap();
  // };

  // const [IsFollow, setIsFollow] = useState(true);

  // const current = JSON.parse(localStorage.getItem('LoginUser'));

  // const handleFollow = async (id): any => {
  //   if (IsFollow) {
  //     const action = unFollow(id);
  //     await dispatch(action).unwrap();
  //     setIsFollow(false);
  //   } else {
  //     const action1 = follow(id);
  //     await dispatch(action1).unwrap();
  //     setIsFollow(true);
  //     let notification = {
  //       postId: current._id,
  //       userId: _id,
  //       type: 3,
  //       senderName: current.name,
  //       img: current.avatar
  //     };
  //     socket.emit('send_notificaton', notification);
  //     let paramsCreate = {
  //       receiver: id,
  //       notiType: 3,
  //       desId: current._id
  //     };
  //     const actionCreateNoti = createNotification(paramsCreate);
  //     await dispatch(actionCreateNoti).unwrap();
  //   }
  // };

  // const handleDirectToAccount = (e): any => {
  //   e.stopPropagation();
  //   setShowModal(false);
  //   const action = addActiveId(_id);
  //   dispatch(action);
  // };

  const { name, avatar, email, authUserId, currentUserId } = useFollowingItem(user, setShowModal);

  return (
    <Row
      className="accountItem"
      // onClick={(e) => handleDirectToAccount(e)}
    >
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
          <Button
            // onClick={(e) => handleUnFollow(e)}
            size="sm">
            Bỏ theo dõi
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowingItem;
