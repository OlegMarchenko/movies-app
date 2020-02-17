import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';
import StrapiService from './services/strapi-service';
import { StrapiServiceProvider } from './components/strapi-service-context';
import { Router } from 'react-router-dom';
import { history } from './utils/history';
import App from './components/app/app';

const strapiService = new StrapiService();

ReactDOM.render(
  <Router history={history}>
    <StrapiServiceProvider value={strapiService}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </StrapiServiceProvider>
  </Router>,
  document.getElementById('root')
);

