import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import UpdateProfile from '../UpdateProfile';
import ChangePassword from '../ChangePassword';
import './styles.scss';

const Dialog = (props: { showModal: any, setShowModal: any }): any => {
  const handleCloseDialog = (): any => {
    props.setShowModal(false);
  };

  return (
    <Modal
      show={props.showModal}
      onHide={handleCloseDialog}
      contentClassName="modal-height"
      dialogClassName="modal-width"
      >
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
                  <UpdateProfile setShowModal={props.setShowModal} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ChangePassword setShowModal={props.setShowModal} />
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
