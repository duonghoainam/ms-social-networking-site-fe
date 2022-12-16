import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserProfile from './components/UserProfile';
import Header from '../../components/Header/Header';

const UserPage = (): ReactElement => {
  return (
    <>
      <Container fluid>
        <Row>
          <Header />
        </Row>
      </Container>
      <UserProfile />
    </>
  );
};

export default UserPage;
