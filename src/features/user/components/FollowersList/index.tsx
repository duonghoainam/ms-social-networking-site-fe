import React, { ReactElement } from 'react';

import Modal from 'react-bootstrap/Modal';
import FollowerItem from '../FollowerItem';
import './styles.scss';

import FollowingItem from '../FollowingItem';
import { useFollowerList } from './useFollowerList';

const FollowersList = (showModal: any, setShowModal: any, isFollowers: boolean): ReactElement => {
  // const followersListStore = useSelector((state) => state.user.userInfo.followers);
  // const followingListStore = useSelector((state) => state.user.userInfo.following);

  // const [followersList, setFollowersList] = useState([]);
  // const [followingList, setFollowingList] = useState([]);

  // useEffect(() => {
  //   setFollowersList(followersListStore);
  //   setFollowingList(followingListStore);
  // }, [followersListStore, followingListStore]);

  // const handleCloseDialog = (): any => {
  //   setShowModal(false);
  // };
  const { followersList, followingList, handleCloseDialog } = useFollowerList(setShowModal);

  return (
    <Modal show={showModal} bsSize="large" onHide={handleCloseDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isFollowers ? 'Danh sách theo dõi bạn ' : 'Danh sách đang theo dõi'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isFollowers
          ? followersList.length === 0
            ? 'Danh sách trống!'
            : followersList.map((item: any, index: any) => (
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

export default FollowersList;
