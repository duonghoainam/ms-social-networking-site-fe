import React, { ReactElement } from 'react';

import Modal from 'react-bootstrap/Modal';
import FollowerItem from '../FollowerItem';
import './styles.scss';

import FollowingItem from '../FollowingItem';
import { useFollowerList } from './useFollowerList';

const FollowersList = (props: { showModal: any, setShowModal: any, isFollowers: boolean }): ReactElement => {
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
  const { followersList, followingList, handleCloseDialog } = useFollowerList(props.setShowModal);

  return (
    <Modal show={props.showModal} bsSize="large" onHide={handleCloseDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.isFollowers ? 'Danh sách theo dõi bạn ' : 'Danh sách đang theo dõi'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.isFollowers
          ? followersList.length === 0
            ? 'Danh sách trống!'
            : followersList.map((item: any, index: any) => (
                <FollowerItem key={index} user={item} setShowModal={props.setShowModal} />
            ))
          : followingList.length === 0
            ? 'Danh sách trống!'
            : followingList.map((item: any, index: any) => (
              <FollowingItem key={index} user={item} setShowModal={props.setShowModal} />
            ))}
      </Modal.Body>
    </Modal>
  );
};

export default FollowersList;
