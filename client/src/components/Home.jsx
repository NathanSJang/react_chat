import React, { useEffect } from 'react';
import { Row, Button, } from 'react-bootstrap';
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

const NEW_REACTION = gql`
  subscription newReaction{
    newReaction{
      uuid 
      content
      message{
        uuid from to 
      }
    }
  }
`;



export default function Home() {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);
  const { data: reactionData, error: reactionError } = useSubscription(NEW_REACTION);

// subscribe message
  useEffect(() => {
    if(messageError) console.log(messageError);
    if(messageData) {
      const message = messageData.newMessage
      const otherUser = user.username === message.to ? message.from : message.to;

      messageDispatch({ 
        type: 'ADD_MESSAGE', 
        payload: {
          username: otherUser,
          message,
      },
    })
  };
}, [messageData, messageError]);

// subscribe reactions
  useEffect(() => {
    if(reactionError) console.log(reactionError);
    if(reactionData) {
      const reaction = reactionData.newReaction;
      const otherUser = user.username === reaction.message.to ? reaction.message.from : reaction.message.to;

      messageDispatch({ 
        type: 'ADD_REACTION', 
        payload: {
          username: otherUser,
          reaction,
      },
    })
  };
}, [reactionData, reactionError]);

  const logout = () => {
    authDispatch({ type: 'LOGOUT' })
    window.location.href = '/login'
  };


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
