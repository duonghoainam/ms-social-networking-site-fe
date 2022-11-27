import React, { ReactElement } from 'react';
import { useChangeProfilePopup } from './useChangeProfilePhotoPopup';

const ChangeProfilePhotoPopup = ({ props }: any): ReactElement => {
  const { handleFileChange, handleCancle } = useChangeProfilePopup(props);
  return (
    <div className="report">
      <div
        className="report__layout"
        onClick={props.handlePopup}
      ></div>
      <div className="report__content">
        <ul>
          <li style={{ padding: 30, fontWeight: 700 }}>Change Profile Photo</li>
          <li style={{ color: 'green' }}>
            <label htmlFor="files">
              <input
                type="file"
                id="files"
                onChange={handleFileChange}
              />{' '}
              Update Photo
            </label>
          </li>
          <li style={{ color: 'red' }}> Remove Current Photo</li>
          <li
            onClick={() => handleCancle()}
            style={{ cursor: 'pointer' }}>
            Cancel
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChangeProfilePhotoPopup;
