import React, { ReactElement } from 'react';
import { Close } from '@material-ui/icons';
import AccountItem from '../AccountItem/AccountItem';
import { Spinner } from 'react-bootstrap';
import './AllLikesPopup.scss';

const AllLikesPopup = ({ isShow, hidePopup }: any): ReactElement => {
  const listLikeComment: any = {
    listUsers: [],
    isLoad: true,
    showModal: false
  };
  return (
    <div className="alllikes" style={{ display: (isShow as boolean) ? '' : 'none' }}>
      <div className="alllikes_overlay" onClick={hidePopup}></div>
      <div className="alllikes_content">
        <div className="alllikes_content_header">
          <p>Lượt thích ({listLikeComment.listUsers.length})</p>
          <Close onClick={hidePopup} />
        </div>
        <div className="alllikes_content_content">
          {(listLikeComment.isLoad as boolean) ? (
            <div className="spinner_wrap">
              <Spinner className="spinner" animation="border" size="sm" />
            </div>
          ) : (
            <>
              {listLikeComment.listUsers.map((user: any, index: any) => {
                return <AccountItem key={index} user={user} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllLikesPopup;
