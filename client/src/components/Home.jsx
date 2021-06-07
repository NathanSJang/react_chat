import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

import { useAuthDispatch } from '../context/auth';

import User from './User';
import Messages from './Messages';



export default function Home({ history }) {
  const dispatch = useAuthDispatch();
//   const [selectedUser, setSelectedUser] = useState(null);

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    window.location.href = '/login'
  }


  return (
    <>
    <Row className="bg-white justify-content-around mb-2">
      <Link to="/login">
        <Button variant="link">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="link">register</Button>
      </Link>
        <Button 
          variant="link"
          onClick={logout}
        >
          LogOut
        </Button>
    </Row>
    <Row className="bg-white">
        <User />
        <Messages />
    </Row>
    </>
  )
}
