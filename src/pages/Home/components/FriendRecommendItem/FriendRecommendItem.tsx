import React, { ReactElement } from 'react';
// import UserSummary from '../../../components/UserSummary/UserSumary';
import { useFriendRecommendItem } from './useFriendRecommendItem';
import './FriendRecommendItem.scss';

const FriendRecommendItem = ({ user }: any): ReactElement => {
  const { isFollow, handleShowProfile, handleFollow } = useFriendRecommendItem();
  return (
    <li key={user.id}>
      <div className="recommend__img">
        <img src={user.avatar} alt="" />
      </div>
      <div className="recommend__name" onClick={() => handleShowProfile()}>
        <a href="">{user?.name}</a>
        <p className="recommend__name_desc">Gợi ý cho bạn</p>
        {/* <div className="recommend__expand">
          <UserSummary user={user}></UserSummary>
        </div> */}
      </div>
      <p
        className="recommend__follow"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await handleFollow(user.id);
        }}>
        {(isFollow as boolean) ? 'Unfollow' : 'Follow'}
      </p>
    </li>
  );
};

export default FriendRecommendItem;
