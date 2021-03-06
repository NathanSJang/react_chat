import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ApolloProvider from './ApolloProvider';

import './App.scss';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/auth';
import { MessageProvider } from './context/messages';
import DynamicRoute from './util/DynamicRoute';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className="pt-5">
              <Switch>
                <DynamicRoute exact path="/" component={Home} authenticated />
                <DynamicRoute path="/register" component={Register} guest />
                <DynamicRoute path="/login" component={Login} guest />
              </Switch>
            </Container>
        </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
