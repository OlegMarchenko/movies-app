import React, {Component} from "react";

import Header from "../header";
import RandomItem from "../random-item";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import {StrapiServiceProvider} from "../strapi-service-context";
import StrapiService from "../../services/strapi-service";
import {MoviePage, SerialPage} from "../pages";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./app.css"


export default class App extends Component {

    strapiService = new StrapiService();

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true})
    }

    render() {


        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundry>
                <StrapiServiceProvider value={this.strapiService}>
                    <Router>
                        <div className="movies-app">
                            <Header/>
                            <RandomItem/>
                            <Switch>
                                <Route path="/movies/:id?" component={MoviePage} exact/>
                                <Route path="/serials/:id?" component={SerialPage} exact/>
                                <Route render={()=> <h2>Page not found</h2>}/>
                            </Switch>
                        </div>
                    </Router>
                </StrapiServiceProvider>
            </ErrorBoundry>
        );
    }

};

