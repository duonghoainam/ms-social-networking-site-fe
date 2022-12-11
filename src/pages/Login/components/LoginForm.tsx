import React, { ReactElement } from 'react';
import { Formik, Form } from 'formik';
import './Auth.scss';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/images/imageStore';
import { useSelector } from 'react-redux';
import { login } from '../loginSlice';
import { useAppDispatch } from '../../../app/store';
import { AppState } from '../../../app/state.type';
import { LoginParams } from '../../../api/auth/type/login.type';
import { ToastContainer } from 'react-toastify';
import { showToastMessage } from '../../../utils/toast.util';
import { ApiResponse } from '../../../api/api-response.type';
import FormikControl from '../../../components/FormikCustom/FormikControl';
import { MessageToastType } from '../../../components/MessageToast/typings.d';
import { addActiveId } from '../../User/state/userSlice';

const initialValues: LoginParams = {
  username: 'giathai1505@gmail.com',
  password: 'my16022001'
};

const LoginForm = (): ReactElement => {
  const navigate = useNavigate();
  const { loading } = useSelector((state: AppState) => state.login);
  const dispatch = useAppDispatch();
  const onSubmit = async (values: LoginParams): Promise<void> => {
    try {
      const response: ApiResponse = await dispatch(login(values)).unwrap();
      if (response.code < 300) {
        showToastMessage('Login success', MessageToastType.SUCCESS);
      }
      // handle user
      const addUserIdAction = addActiveId(response.data.id);
      dispatch(addUserIdAction);
      navigate('/');
    } catch (error) {
      showToastMessage(error.message, MessageToastType.ERROR);
    }
  };

  return (
    <>
      <div className="loginForm">
        <div className="loginForm__left">
          <img src={IMAGES.login.phone} alt="" />
        </div>
        <div className="loginForm__right">
          <div className="loginForm__right__user">
            <img src={IMAGES.login.avatar} alt="" />
          </div>

          <div className="loginForm__right__header">WELCOME</div>
          <div className="loginForm__right__content">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form>
                    <FormikControl control="input" type="text" label="Email" name="username" />

                    <FormikControl
                      control="input"
                      label="Password"
                      type="password"
                      name="password"
                    />

                    <Button variant="primary" type="submit">
                      {(loading as boolean) ? (
                        <div>
                          {' '}
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            style={{ marginRight: '10px' }}
                          />
                          Loading...
                        </div>
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="loginForm__right__footer">
            Do you have account? <Link to="/register">Register Now</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
