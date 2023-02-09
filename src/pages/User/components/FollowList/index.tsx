import React, { ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';
import { useFollowList } from './useFollowList';
import AccountItem from '../../../../components/AccountItem/AccountItem';

const FollowList = ({ showModal, setShowModal, isFollowers }: any): ReactElement => {
  const { followerList, followingList, handleCloseDialog } = useFollowList(setShowModal);

  return (
    <Modal show={showModal} onHide={handleCloseDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {(Boolean(isFollowers)) ? 'Danh sách người theo dõi' : 'Danh sách đang theo dõi'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(Boolean(isFollowers))
          ? followerList.length === 0
            ? 'Danh sách trống!'
            : followerList.map((item: any, index: any) => (
              <AccountItem key={index} user={item} />
            ))
          : followingList.length === 0
            ? 'Danh sách trống!'
            : followingList.map((item: any, index: any) => (
              <AccountItem key={index} user={item} />
            ))}
      </Modal.Body>
    </Modal>
  );
};

export default FollowList;
