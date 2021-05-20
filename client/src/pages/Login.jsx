import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';

const LOGIN_USER = gql`
  query Login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const history = useHistory();

  const [variables, setVariables] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading, data, error }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      localStorage.setItem('token', data.login.token);
      props.history.push('/');
    }
  });

  const submitLoginForm = (event) => {
    event.preventDefault();

    loginUser({ variables })
  }

  return (
    <Row className="bg-white py-5 justify-content-center">
    <Col sm={8} md={6} lg={4}>
      <h1 className="text-center">Login</h1>
      <Form onSubmit={submitLoginForm}>
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
        <div className="text-center">
          <Button variant="success" type="submit" disabled={loading}>
            { loading ? 'loading..' : 'Login' }
          </Button>
          <br />
          <small>
            Don't have an account? <Link to="/register">Register</Link> 
          </small>
        </div>
      </Form>
    </Col>
  </Row>
  );
}
