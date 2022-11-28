import React, { useEffect, ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserProfile from './components/UserProfile';
import Header from '../../shareComponents/header/Header';

const UserPage = (): ReactElement => {
  useEffect(() => {
    document.title = 'Midori • Profile';
  });

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
