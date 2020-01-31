import React, {Component} from "react";

import Header from "../header";
import RandomItem from "../random-item";
import MoviesPage from "../movies-page";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";

import "./app.css"
import SerialsPage from "../serials-page";

import {StrapiServiceProvider} from "../strapi-service-context";
import StrapiService from "../../services/strapi-service";


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
                        <MoviesPage/>
                        {/*<SerialsPage/>*/}
                    </div>
                </StrapiServiceProvider>
            </ErrorBoundry>
        );
    }

};

