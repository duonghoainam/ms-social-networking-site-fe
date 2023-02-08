import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserProfile from './components/UserProfile';
import Header from '../../components/Header/Header';
import { ToastContainer } from 'react-toastify';

const UserPage = (): ReactElement => {
  return (
    <>
      <Container fluid>
        <Row>
          <Header />
        </Row>
        <ToastContainer />
      </Container>
      <UserProfile />
    </>
  );
};

export default UserPage;
