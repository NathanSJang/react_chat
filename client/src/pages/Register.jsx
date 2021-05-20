import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const history = useHistory();

  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading, data, error }] = useMutation(REGISTER_USER, {
    update(_, __) {
      props.history.push('/login')
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    }
  });

  const submitRegisterForm = (event) => {
    event.preventDefault();

    registerUser({ variables })
  }

  return (
    <Row className="bg-white py-5 justify-content-center">
    <Col sm={8} md={6} lg={4}>
      <h1 className="text-center">Register</h1>
      <Form onSubmit={submitRegisterForm}>
        <Form.Group>
          <Form.Label className={errors.email && 'text-danger'}>
            {errors.email ?? 'Email address'}
          </Form.Label>
          <Form.Control 
            className={errors.email && 'is-invalid'}
            type="email" 
            value={variables.email}
            onChange={(event) => 
              setVariables({ ...variables, email: event.target.value })}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label className={errors.username && 'text-danger'}>
            {errors.username ?? 'Username'}
          </Form.Label>
          <Form.Control
            className={errors.username && 'is-invalid'} 
            type="text" 
            value={variables.username}
            onChange={(event) => 
              setVariables({ ...variables, username: event.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className={errors.password && 'text-danger'}>
            {errors.password ?? 'Password'}
          </Form.Label>
          <Form.Control
            className={errors.password && 'is-invalid'}
            type="password"
            value={variables.password}
            onChange={(event) => 
              setVariables({ ...variables, password: event.target.value })} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className={errors.confirmPassword && 'text-danger'}>
            {errors.confirmPassword ?? 'Confirm Password'}
          </Form.Label>
          <Form.Control
            className={errors.confirmPassword && 'is-invalid'}
            type="password" 
            value={variables.confirmPassword}
            onChange={(event) => 
              setVariables({ ...variables, confirmPassword: event.target.value })}
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="success" type="submit" disabled={loading}>
            { loading ? 'loading..' : 'Register' }
          </Button>
          <br />
          <small>
            Already have an account? <Link to="/login">Login</Link> 
          </small>
        </div>
      </Form>
    </Col>
  </Row>
  );
}
