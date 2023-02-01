import React, { ReactElement } from 'react';
import '../Header/Header.scss';
import { UseNotification } from './useNotification';
import { NotificationsNoneOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import NotificationItem from '../NotifyItem/NotificationItem';

const Notification = ({ info, handleNum }: any): ReactElement => {
  const {
    notifications,
    handleToggle,
    handleMarkAsReadAll,
    isOpen
  } = UseNotification()
  if (isOpen) {
    return (
      <>
        <IconButton onClick={handleToggle}>
          <NotificationsNoneOutlined
          />
        </IconButton>
      <div className="notification">
        <div className="notification__panel">
          {notifications.length > 0 ? (
            <>
              <div className="headerThongBao">Thông báo</div>
              <ul>
                {notifications.map((item, index) => {
                  return (
                    <NotificationItem
                      key = {item._id}
                      notification = {item}
                    />
                  );
                })}
              </ul>
              <div className="seeMore" onClick={handleMarkAsReadAll}>
                Đánh dấu đã đọc
              </div>
            </>
          ) : (
            <div className="noNotification">Không có thông báo nào</div>
          )}
        </div>
      </div>
      </>)
  } else {
    return <>
      <IconButton onClick={handleToggle}>
        <NotificationsNoneOutlined
        />
      </IconButton>
      <div className="notification"></div>
    </>
  }
};

export default Notification;
