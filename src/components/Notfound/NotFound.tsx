import React, { ReactElement } from 'react';
import IMAGES from '../../assets/images/imageStore';
import './NotFound.scss';

const NotFound = (): ReactElement => {
  return (
    <div className="notfound">
      <img src={IMAGES.notfound} alt="" />
    </div>
  );
};

export default NotFound;
