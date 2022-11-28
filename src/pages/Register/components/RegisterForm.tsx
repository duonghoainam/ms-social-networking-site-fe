import React, { ReactElement } from 'react';
import { Formik, Form } from 'formik';
import './Auth.scss';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/images/imageStore';
import { useAppDispatch } from '../../../app/store';
import { RegisterParams } from '../../../api/auth/type/register.type';
import FormikControl from '../../../components/FormikCustom/FormikControl';
import { register } from '../registerSlice';

const initialValues = {
  username: 'giathai1505@gmail.com',
  password: 'my16022001',
  name: 'Gia Thái',
  gender: 'male'
};

const RegisterForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterParams): Promise<void> => {
    try {
      const result = await dispatch(register(values)).unwrap();
      alert(result.message);
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const radioOptions = [
    { key: '1', value: 'male' },
    { key: '2', value: 'female' },
    { key: '3', value: 'other' }
  ];

  return (
    <div className="loginForm registerForm">
      <div className="loginForm__left">
        <img id="registerImg" src={IMAGES.login.register} alt="" />
      </div>
      <div className="loginForm__right">
        <div className="loginForm__right__user">
          <img src={IMAGES.login.avatar2} alt="" />
        </div>

        <div className="loginForm__right__header">REGISTER</div>
        <div className="loginForm__right__content">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => {
              return (
                <Form>
                  <div className="rowform">
                    <FormikControl control="input" label="Name" type="text" name="name" />
                  </div>

                  <div className="rowform">
                    <FormikControl control="input" type="email" label="Username" name="username" />
                    <FormikControl control="datetime" label="Chọn ngày sinh" name="dateOfBirth" />
                  </div>
                  <FormikControl
                    control="radio"
                    label="Gender"
                    name="gender"
                    options={radioOptions}
                  />

                  <div className="rowform">
                    <FormikControl
                      control="input"
                      label="Password"
                      type="password"
                      name="password"
                    />
                  </div>

                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="loginForm__right__footer">
          Do you have account? <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
