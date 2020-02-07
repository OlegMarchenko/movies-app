import React, {Component} from "react";
import Header from "../header";
import RandomItem from "../random-item";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import {StrapiServiceProvider} from "../strapi-service-context";
import StrapiService from "../../services/strapi-service";
import {MoviePage, SerialPage, SignupPage, SigninPage} from "../pages";
import {Router, Route, Switch} from "react-router-dom";
import {history} from "../../utils/history";

import "./app.css"

export class App extends Component {

    strapiService = new StrapiService();

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundry>
                <StrapiServiceProvider value={this.strapiService}>
                    <Router history={history}>
                        <div className="movies-app">
                            <Route component={Header}/>
                            <RandomItem/>
                            <Switch>
                                <Route path="/movies/:id?" component={MoviePage} exact/>
                                <Route path="/serials/:id?" component={SerialPage} exact/>
                                <Route path="/signup" component={SignupPage}/>
                                <Route path="/signin" component={SigninPage}/>
                            </Switch>
                        </div>
                    </Router>
                </StrapiServiceProvider>
            </ErrorBoundry>
        );
    }

}

