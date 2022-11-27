import React, { ReactElement } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { useUpdateProfile } from './useUpdateProfile';
import './styles.scss';

const UpdateProfile = (props: { setShowModal: any }): ReactElement => {
  const { name, email, mobile, role, onChangeUserInfo, handleFileChange, onSubmit } = useUpdateProfile(props.setShowModal);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Row>
          <Col sm={2} className="text-right">
            <Form.Label>Avatar</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control className="w-100" type="file" name="avatar" onChange={handleFileChange} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={2} className="text-right">
            <Form.Label>Name</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              className="w-100"
              type="text"
              name="name"
              required
              value={name}
              onChange={onChangeUserInfo}
              placeholder="Enter your name"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={2} className="text-right">
            <Form.Label>Email</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              disabled
              className="w-100"
              type="text"
              name="email"
              value={email}
              onChange={onChangeUserInfo}
              placeholder="Enter your email address"
            />
            <Form.Text className="text-muted">Change new email address</Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={2} className="text-right">
            <Form.Label>Mobile</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              className="w-100"
              type="text"
              name="mobile"
              value={mobile}
              onChange={onChangeUserInfo}
              placeholder="Enter your phone number"
            />
            <Form.Text className="text-muted">Add new phone number</Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={2} className="text-right">
            <Form.Label>Gender</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control as="select" value={role} name="role" onChange={onChangeUserInfo}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
            <Form.Text className="text-muted">Choose your gender</Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Button variant="primary" className="submit-btn" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default UpdateProfile;
