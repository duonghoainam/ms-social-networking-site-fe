import React, { ReactElement, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import ErrorIcon from '../../assets/icons/error.png';
import SuccessIcon from '../../assets/icons/success.png';
import WarningIcon from '../../assets/icons/warning.png';
import { MessageToastProps, MessageToastType } from './typings.d';

const MessageToast = ({ message, type }: MessageToastProps): ReactElement => {
  const [show] = useState(true);
  const typeIcon = getIconType(type);

  return (
    <ToastContainer position={'top-end'}>
      <Toast show={show}>
        <Toast.Header>
          <img src={typeIcon} className="rounded me-2" alt="" />
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const getIconType = (type: MessageToastType): any => {
  switch (type) {
    case MessageToastType.ERROR:
      return ErrorIcon;
    case MessageToastType.SUCCESS:
      return SuccessIcon;
    case MessageToastType.WARNING:
      return WarningIcon;
    default:
      return ErrorIcon;
  }
};
export default MessageToast;
