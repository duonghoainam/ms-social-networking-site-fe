import React, { ReactElement } from 'react';
import LoginForm from './components/LoginForm';
import './LoginPage.scss';

const LoginPage = (): ReactElement => {
  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
