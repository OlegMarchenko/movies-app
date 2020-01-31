import React, {Component} from "react";

import StrapiService from "../../services/strapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details";

import './movies-page.css';

export default class MoviesPage extends Component {

    strapiService = new StrapiService();

    state = {
        selectedItem: null,
        hasError: false
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    };

    render() {

        const {getAllMovies, getMovie} = this.strapiService;
        const {selectedItem} = this.state;

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={getAllMovies}>
                {(i) => `${i.name}`}
            </ItemList>
        );

        const itemDetails = (
            <ItemDetails itemId={selectedItem}
                         getData={getMovie}>
                <Record label ="Name" field="name" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={itemDetails}/>
            </ErrorBoundry>
        )
    }
};