import React, { ReactElement } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/state.type';
import { fakeUser } from '../../fake-data';
import FriendRecommendItem from './FriendRecommendItem/FriendRecommendItem';

const Category = (): ReactElement => {
  const { listRecommend }: any = useSelector((state: AppState) => state.home);
  // const current = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const current = fakeUser;

  return (
    <Row>
      <div className="recommend">
        <div className="recommend__account">
          <img src={current.avatar} alt="" />
          <div className="recommend__account__name">
            <p>{current.name}</p>
            <p>{current.email}</p>
          </div>
        </div>
        <div className="recommend__header">
          <p>Gợi ý cho bạn</p>
          {/* <a href="">Xem tất cả</a> */}
        </div>
        <ul>
          {(listRecommend as boolean) &&
            listRecommend.map((user: any, index: any) => {
              if (index < 4) {
                return <FriendRecommendItem key={index} user={user} />;
              }
              return null;
            })}
        </ul>
      </div>
    </Row>
  );
};

export default Category;
