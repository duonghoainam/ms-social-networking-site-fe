import React, { ReactElement } from 'react';
import UserHeader from '../UserHeader';
import UserPost from '../UserPost';
import { useUserProfile } from './useUserProfile';

const UserProfile = (): ReactElement => {
  void useUserProfile();

  return (
    <>
      <UserHeader />
      <UserPost />
    </>
  );
};

export default UserProfile;
