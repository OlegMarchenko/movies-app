import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header";
import RandomItem from '../random-item/random-item';
import {
  AdminPage,
  MoviePage,
  SerialPage,
  SignupPage,
  SigninPage,
  NetflixPage,
  SinglePage
} from '../pages'


import "./app.css"

const App = () => {
  return (
    <div className="movies-app">
      <Route component={Header}/>
      <Route component={RandomItem}/>
      <Switch>
        <Route path="/movies/:id?" component={MoviePage} exact/>
        <Route path="/serials/:id?" component={SerialPage} exact/>
        <Route path="/netflix/:id?" component={NetflixPage} exact/>
        <Route path="/netflix/single/:id/" component={SinglePage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/signin" component={SigninPage}/>
        <Route path="/admin" component={AdminPage}/>
      </Switch>
    </div>
  )
};

export default App;

