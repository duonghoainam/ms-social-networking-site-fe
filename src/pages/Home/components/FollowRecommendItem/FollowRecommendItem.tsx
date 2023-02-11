import React, { ReactElement } from 'react';
import UserSummary from '../UserSummary/UserSumary';
import './FollowRecommendItem.scss';
import { useFollowRecommendItem } from './useFollowRecommendItem';

const FollowRecommendItem = ({ item }: any): ReactElement => {
  const { isFollow, handleShowProfile, handleFollow, showRecommend, hideRecommend, isShowRecommend } = useFollowRecommendItem();
  return (
    <li key={item.user.id}>
      <div className="recommend__img">
        <img src={item.user.avatar} alt="" />
      </div>
      <div className="recommend__name"
        onMouseOver={() => showRecommend()}
        onMouseLeave={() => hideRecommend()}
        onClick={() => handleShowProfile()}
      >
        <a href={`./${item.user.id}`}>{item.user?.name}</a>
        <p className="recommend__name_desc">{item.mutualFollowings} theo dõi chung</p>
        <div className="recommend__expand">
          {isShowRecommend ? <UserSummary user={item.user} posts={item.posts}></UserSummary> : ""}
        </div>
      </div>
      <p
        className="recommend__follow"
        onClick={() => {
          void handleFollow(item.user.id);
        }}>
        {(isFollow as boolean) ? 'Bỏ theo dõi' : 'Theo dõi'}
      </p>
    </li>
  );
};

export default FollowRecommendItem;
