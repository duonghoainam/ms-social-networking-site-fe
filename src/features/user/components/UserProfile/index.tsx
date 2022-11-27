/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { ReactElement } from 'react';
import UserHeader from '../UserHeader';
import UserPost from '../UserPost';
import { useUserProfile } from './useUserProfile';

const UserProfile = (): ReactElement => {
  // const activeId = useSelector((state) => state.user.activeId);
  // const dispatch = useDispatch();
  // useEffect(async () => {
  //   const action = getUserById(activeId);
  //   await dispatch(action);
  // }, [activeId]);
  void useUserProfile();
  return (
    <>
      <UserHeader />
      <UserPost />
    </>
  );
};

export default UserProfile;
