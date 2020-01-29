import React, {Component} from "react";

import Header from "../header";
import RandomItem from "../random-item";
import MoviesPage from "../movies-page";
import ErrorIndicator from "../error-indicator";

import "./app.css"
import SerialsPage from "../serials-page";


export default class App extends Component {

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
            <div className="movies-app">
                <Header/>
                <RandomItem/>
                <MoviesPage/>
                <SerialsPage/>
            </div>
        );
    }

};

