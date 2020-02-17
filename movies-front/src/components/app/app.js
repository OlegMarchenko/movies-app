import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header";
import RandomItem from "../random-item";
import AdminPage from "../pages/admin-page";
import MoviePage from '../pages/movie-page';
import SerialPage from '../pages/serial-page';
import SignupPage from '../pages/signup-page';
import SigninPage from '../pages/signin-page';

import "./app.css"

function App() {
  return (
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
  )
}

export default App;

