import React, { useState } from 'react';
import { SendOutlined } from '@material-ui/icons';
import '../Chat.scss';
import { Button } from 'react-bootstrap';
import MessagePopup from '../MessagePopup/MessagePopup';

function DefaultContent(): React.ReactElement {
  const [isShowPopup, setIsShowPopup] = useState(false);
  return (
    <div className="rightPanel default">
      <div className="rightPanel__iconSendMessageWrapper">
        <SendOutlined
          className="rightPanel__iconSendMessageWrapper__iconSendMessage"
          onClick={() => {
            // navigator.clipboard.writeText(`http://localhost:8000/user/${post._id}`);
            // alert('Copied to clipboard');
          }}
        />
      </div>
      <h5>Tin nhắn của bạn</h5>
      <p>Gửi hình ảnh và tin nhắn cho bạn bè hoặc nhóm của bạn.</p>
      <Button
        variant="primary"
        as="button"
        className="rightPanel__sendMessageBtn"
        onClick={() => setIsShowPopup(true)}>
        Gửi tin nhắn
      </Button>
      {isShowPopup && <MessagePopup setIsShowPopup={setIsShowPopup} />}
    </div>
  );
}

export default DefaultContent;
