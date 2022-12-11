import React, { ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import FollowerItem from '../FollowerItem';
import './styles.scss';
import FollowingItem from '../FollowingItem';
import { useFollowList } from './useFollowList';

const FollowList = ({ showModal, setShowModal, isFollowers }: any): ReactElement => {
  const { followerList, followingList, handleCloseDialog } = useFollowList(setShowModal);

  return (
    <Modal show={showModal} bsSize="large" onHide={handleCloseDialog} centered>
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
                <FollowerItem key={index} user={item} setShowModal={setShowModal} />
            ))
          : followingList.length === 0
            ? 'Danh sách trống!'
            : followingList.map((item: any, index: any) => (
              <FollowingItem key={index} user={item} setShowModal={setShowModal} />
            ))}
      </Modal.Body>
    </Modal>
  );
};

export default FollowList;
