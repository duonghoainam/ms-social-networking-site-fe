import React, { ReactElement } from 'react';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import './WarningPopup.scss';

const WarningPopup = ({ content = '', title = '', handleAccept, handleCancel }: any): ReactElement => {
  return (
    <>
      <div id="warningPopup">
        <div id="warningPopup__content">
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
        <div id="warningPopup__button">
          <button onClick={handleAccept}>OK</button>
          <button onClick={handleCancel}>CANCEL</button>
        </div>
      </div>
      <PopupOverlay onClick={handleCancel} />
    </>
  );
};

export default WarningPopup;
