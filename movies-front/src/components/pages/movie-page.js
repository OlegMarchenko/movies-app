import React, {Component} from "react";
import Row from "../row";
import {MovieList} from "../strapi-components";
import MovieDetails from "../strapi-components/movie-details";
import ErrorBoundry from "../error-boundry";

export default class MoviePage extends Component {

    state = {
        selectedItem: null
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    };

    render() {
        const {selectedItem} = this.state;

        return (
            <ErrorBoundry>
                <Row
                    left={<MovieList onItemSelected={this.onItemSelected}/>}
                    right={<MovieDetails itemId={selectedItem}/>}
                />
            </ErrorBoundry>
        )
    }
}