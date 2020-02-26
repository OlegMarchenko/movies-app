import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';
import { Router } from 'react-router-dom';
import { history } from './utils/history';
import App from './components/app/app';


ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

