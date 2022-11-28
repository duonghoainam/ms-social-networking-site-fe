import React, { ReactElement } from 'react';
import './PopupOverlay.scss';
const PopupOverlay = ({ onClick = null }: any): ReactElement => {
  return <div id="PopupOverlay" onClick={onClick}></div>;
};

export default PopupOverlay;
