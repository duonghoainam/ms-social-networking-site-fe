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
import { showToastMessage } from '../../../utils/toast.util';
import { MessageToastType } from '../../../components/MessageToast/typings.d';

const initialValues = {
  username: '',
  password: '',
  name: '',
  gender: 'male'
};

const RegisterForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterParams): Promise<void> => {
    try {
      const response = await dispatch(register(values)).unwrap();
      if(response.code <= 300){
        showToastMessage("Đăng ký thành công", MessageToastType.SUCCESS)
        navigate('/login');
      }else{
        showToastMessage(response.message, MessageToastType.ERROR)
      }
    } catch (error) {
      showToastMessage(error.message, MessageToastType.ERROR)
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
