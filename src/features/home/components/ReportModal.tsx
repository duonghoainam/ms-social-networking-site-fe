import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../app/state.type';
import { HideReportModal } from '../homeSlice';
import './PostItem/PostItem.scss';

const ReportModal = ({ postId }: any): ReactElement => {
  const dispatch = useDispatch();
  const isShow = useSelector((state: AppState) => state.home.isShowReportModal);

  const HideModal = (): void => {
    const action = HideReportModal(null);
    dispatch(action);
  };

  const handleUnfollow = (id: string): void => {
    // const action = unFollow(id);
    // dispatch(action);
  };

  return (
    <div className="report" style={{ display: (isShow as boolean) ? '' : 'none' }}>
      <div className="report__layout" onClick={HideModal}></div>
      <div className="report__content">
        <ul>
          <li>Report</li>
          <li onClick={() => handleUnfollow(postId)}>Unfollow</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportModal;
