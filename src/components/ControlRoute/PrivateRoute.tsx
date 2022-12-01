import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { fakeUser } from '../../fake-data';
import useAuth from '../../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  // const auth = useAuth();
  // return auth ? children : <Navigate to="/login" />;

  const currentUser = fakeUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return children;
};

export default PrivateRoute;
