import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { gql, useSubscription} from '@apollo/client';

import { useAuthDispatch, useAuthState } from '../context/auth';
import { useMessageDispatch } from '../context/messages';

import User from './User';
import Messages from './Messages';

const NEW_MESSAGE = gql`
  subscription newMessage{
    newMessage{
      uuid 
      from 
      to 
      content 
      createdAt
    }
  }
`;



export default function Home({ history }) {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

  useEffect(() => {
    if(messageError) console.log(messageError);
    if(messageData) {
      const message = messageData.newMessage
      const otherUser = user.username === message.to ? message.from : message.to

      messageDispatch({ 
        type: 'ADD_MESSAGE', 
        payload: {
          username: otherUser,
          message,
      },
    })
  }
}, [messageData, messageError])

  const logout = () => {
    authDispatch({ type: 'LOGOUT' })
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
