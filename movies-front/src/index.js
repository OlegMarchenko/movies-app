import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import { history } from './utils/history';
import client from './utils/apolloClient';
import App from './components/app/app';


render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

