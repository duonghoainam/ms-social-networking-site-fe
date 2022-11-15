import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  const auth = useAuth();

  return auth ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
