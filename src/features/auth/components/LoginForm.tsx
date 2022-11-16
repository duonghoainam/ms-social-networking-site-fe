import React, { ReactElement } from 'react';
import { Formik, Form } from 'formik';
import './auth.scss';
import { Button, Spinner } from 'react-bootstrap';
import FormikControl from '../../../components/formikCustom/FormikControl';
import { Link, useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/images/imageStore';
import { useSelector } from 'react-redux';
import { login } from '../authSlice';
import { addActiveId } from '../../user/profileSlice';
import { useAppDispatch } from '../../../app/store';
import { AppState } from '../../../app/state.type';
import { LoginParams } from '../../../api/auth/type/login.type';

const initialValues: LoginParams = {
  username: 'giathai1505@gmail.com',
  password: 'my16022001'
};

const LoginForm = (): ReactElement => {
  const navigate = useNavigate();
  const { loading } = useSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();
  const onSubmit = async (values: LoginParams): Promise<void> => {
    try {
      const response: any = await dispatch(login(values)).unwrap();
      // handle user
      // await dispatch(getAllUsers()).unwrap();
      const addUserIdAction = addActiveId(response.data.id);
      dispatch(addUserIdAction);
      navigate('/');
    } catch (error) {
      alert(error.message);
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
            Do you have account? <Link to="/auth/register">Register Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
