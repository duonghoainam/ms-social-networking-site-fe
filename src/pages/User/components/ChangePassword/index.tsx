import React, { ReactElement } from 'react';

import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { useChangePassword } from './useChangePassword';

import './styles.scss';

const ChangePassword = ({ setShowModal }: any): ReactElement => {
  const { onChangeFormValues, onSubmit, formValues } = useChangePassword(setShowModal);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={3} className="text-right">
            <Form.Label>Old Password</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              className="w-100"
              type="password"
              name="oldPassword"
              onChange={onChangeFormValues}
              value={formValues.oldPassword}
              placeholder="Enter your old password"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={3} className="text-right">
            <Form.Label>New Password</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              className="w-100"
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              onChange={onChangeFormValues}
              value={formValues.newPassword}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col sm={3} className="text-right">
            <Form.Label>Confirm New Password</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              className="w-100"
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              onChange={onChangeFormValues}
              value={formValues.confirmPassword}
            />
          </Col>
        </Row>
      </Form.Group>
      <Button variant="primary" className="submit-btn" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ChangePassword;
