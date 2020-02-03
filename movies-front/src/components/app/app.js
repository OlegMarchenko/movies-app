import React, {Component} from "react";

import Header from "../header";
import RandomItem from "../random-item";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import {StrapiServiceProvider} from "../strapi-service-context";
import StrapiService from "../../services/strapi-service";
import {MoviePage, SerialPage} from "../pages";

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
                    <div className="movies-app">
                        <Header/>
                        <RandomItem/>
                        <MoviePage/>
                        <SerialPage/>
                    </div>
                </StrapiServiceProvider>
            </ErrorBoundry>
        );
    }

};

