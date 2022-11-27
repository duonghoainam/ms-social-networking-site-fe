import React, { ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import './styles.scss';
import UpdateProfile from '../UpdateProfile';
import ChangePassword from '../ChangePassword';

const Dialog = (showModal: any, setShowModal: any): ReactElement => {
  const handleCloseDialog = (): any => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      bsSize="large"
      onHide={handleCloseDialog}
      contentClassName="modal-height"
      dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Change Password</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <UpdateProfile setShowModal={setShowModal} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ChangePassword setShowModal={setShowModal} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default Dialog;
