import React, { ReactElement } from 'react';
import RegisterForm from './components/RegisterForm';
import './RegisterPage.scss';

const RegisterPage = (): ReactElement => {
  return (
    <div className="registerPage">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
