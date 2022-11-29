import React, { ReactElement } from 'react';
import UserSummary from '../../../components/UserSummary/UserSumary';
import { useFriendRecommendItem } from './useFriendRecommendItem';
import './FriendRecommendItem.scss';

const FriendRecommendItem = ({ user }: any): ReactElement => {
  const {
    isShowRecommend,
    isFollow,
    // setIsFollow,
    handleShowProfile,
    handleFollow
  } = useFriendRecommendItem();
  return (
    <li key={user._id}>
      <div className="recommend__img">
        <img src={user.avatar} alt="" />
      </div>
      <div className="recommend__name" onClick={() => handleShowProfile()}>
        <a href="">{user?.name}</a>
        <p className="recommend__name_desc">Gợi ý cho bạn</p>
        <div className="recommend__expand">
          {(isShowRecommend as boolean) ? <UserSummary user={user}></UserSummary> : ''}
        </div>
      </div>
      <p className="recommend__folo" onClick={() => handleFollow()}>
        {(isFollow as boolean) ? 'Bỏ theo dõi' : 'Theo dõi'}
      </p>
    </li>
  );
};

export default FriendRecommendItem;
