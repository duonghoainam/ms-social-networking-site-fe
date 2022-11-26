import React, { ReactElement } from 'react';
import UserHeader from '../UserHeader';
import UserPost from '../UserPost';

const UserProfile = (): ReactElement => {
  // const activeId = useSelector((state) => state.user.activeId);

  // const dispatch = useDispatch();
  // useEffect(async () => {
  //   const action = getUserById(activeId);
  //   await dispatch(action);
  // }, [activeId]);
  return (
    <>
      <UserHeader />
      <UserPost />
    </>
  );
};

export default UserProfile;
