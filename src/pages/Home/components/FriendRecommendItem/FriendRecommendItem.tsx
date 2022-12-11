import React, { ReactElement } from 'react';
// import UserSummary from '../../../components/UserSummary/UserSumary';
import { useFriendRecommendItem } from './useFriendRecommendItem';
import './FriendRecommendItem.scss';

const FriendRecommendItem = ({ item }: any): ReactElement => {
  const { isFollow, handleShowProfile, handleFollow } = useFriendRecommendItem();
  return (
    <li key={item.user.id}>
      <div className="recommend__img">
        <img src={item.user.avatar} alt="" />
      </div>
      <div className="recommend__name" onClick={() => handleShowProfile()}>
        <a href="">{item.user?.name}</a>
        <p className="recommend__name_desc">{item.mutualFollowings} mutual followings</p>
        {/* <div className="recommend__expand">
          <UserSummary user={user}></UserSummary>
        </div> */}
      </div>
      <p
        className="recommend__follow"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await handleFollow(item.user.id);
        }}>
        {(isFollow as boolean) ? 'Unfollow' : 'Follow'}
      </p>
    </li>
  );
};

export default FriendRecommendItem;
