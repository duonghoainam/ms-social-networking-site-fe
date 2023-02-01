import React, { ReactElement } from 'react';
import { ModeComment, Forum, Favorite, ReplyAll, CreateNewFolder } from '@material-ui/icons';
import { format } from 'timeago.js';
import './Header.scss';
import { Col, Row } from 'react-bootstrap';
import { INotification } from '../../pages/Chat/types/INotification.Type';
import { TypeNotify } from '../../constants/enums/notify-type.enum';


const NotificationItem = ({ notification }: { notification: INotification }): ReactElement => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  let content = '';
  let icon;
  switch (notification.type) {
    case TypeNotify.COMMENT:
      content = ' đã bình luận bài viết của bạn';
      icon = <ModeComment className="commentIcon" />;
      break;
    case TypeNotify.LIKE_POST:
      content = ' đã thích bài viết của bạn';
      icon = <Favorite className="tymIcon" />;
      break;
    case TypeNotify.FOLLOW:
      content = ' đã theo dõi bạn';
      icon = <ReplyAll className="followIcon" />;
      break;
    case TypeNotify.REPLY:
      content = ' đã phản hồi bình luận của bạn';
      icon = <Forum className="replyIcon" />;
      break;
    case TypeNotify.NEW_POST:
      content = ' vừa đăng bài viết mới';
      icon = <CreateNewFolder className="newIcon" />;
      break;
    case TypeNotify.LIKE_COMMENT:
      content = ' đã thích bình luận của bạn của bạn';
      icon = <Favorite className="tymIcon" />;
      break;
    default:
      break;
  }

  return (
    <Row className={notification.read ? 'notificationItem' : 'notificationItem notSeen'}>
      <Col md={3}>
        <div className="notificationItem_Img">
          <img src={notification.from.avatar} alt="" />
          {icon}
        </div>
      </Col>

      <Col md={9} style={{ padding: 0 }}>
        <div className="notificationContent">
          <span className="commentName">{notification.from.name}</span> {content}.
          <div
            className="seePost"
            // onClick={() => showPostDetail(info.desId, info._id)}
          >
            {notification.type === TypeNotify.FOLLOW ? 'Xem trang cá nhân' : 'Xem bài viết'}
          </div>
          <Row>
            <Col md={10}>
              <div className="time">{format(notification.createdAt)}</div>
            </Col>
            {notification.read ? (
              <></>
            ) : (
              <Col md={2}>
                <div className="notSeen"></div>
              </Col>
            )}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default NotificationItem;
