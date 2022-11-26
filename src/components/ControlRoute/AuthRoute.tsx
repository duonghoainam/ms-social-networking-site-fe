import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthRoute = ({ children, ...rest }: any): ReactElement => {
  const auth = useAuth();
  return !auth ? children : <Navigate to="/" />;
};

export default AuthRoute;
