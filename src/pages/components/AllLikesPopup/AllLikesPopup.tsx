import React, { ReactElement } from 'react';
import { Close } from '@material-ui/icons';
import AccountItem from '../AccountItem/AccountItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { HideAllLikesModal } from '../../homeSlice';
import { Spinner } from 'react-bootstrap';

const AllLikesPopup = (): ReactElement => {
  // const dispatch = useDispatch();
  // const { listLikeComment } = useSelector((state) => state.home);
  const listLikeComment: any = {
    listUsers: [],
    isLoad: true,
    showModal: false
  };
  // const hideModal = () => {
  //   const action = HideAllLikesModal();
  //   dispatch(action);
  // };
  return (
    <div
      className="alllikes"
      style={{ display: (listLikeComment.showModal as boolean) ? '' : 'none' }}>
      <div
        className="alllikes_overlay"
        // onClick={hideModal}
      ></div>
      <div className="alllikes_content">
        <div className="alllikes_content_header">
          <p>Lượt thích ({listLikeComment.listUsers.length})</p>
          <Close
          // onClick={hideModal}
          />
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
