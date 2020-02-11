import React, { Component } from "react";
import Header from "../header";
import RandomItem from "../random-item";
import { StrapiServiceProvider } from "../strapi-service-context";
import StrapiService from "../../services/strapi-service";
import { MoviePage, SerialPage, SignupPage, SigninPage } from "../pages";
import { AdminPage } from "../pages/admin-page";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../../utils/history";
import { ApolloProvider } from 'react-apollo';
import client from "../../utils/apolloClient";

import "./app.css"

export class App extends Component {

  strapiService = new StrapiService();

  render() {

    return (

      <StrapiServiceProvider value={this.strapiService}>
        <Router history={history}>
          <ApolloProvider client={client}>
            <div className="movies-app">
              <Route component={Header}/>
              <RandomItem/>
              <Switch>
                <Route path="/movies/:id?" component={MoviePage} exact/>
                <Route path="/serials/:id?" component={SerialPage} exact/>
                <Route path="/signup" component={SignupPage}/>
                <Route path="/signin" component={SigninPage}/>
                <Route path="/admin" component={AdminPage}/>
              </Switch>
            </div>
          </ApolloProvider>
        </Router>
      </StrapiServiceProvider>
    );
  }
}

