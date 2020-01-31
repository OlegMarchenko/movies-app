import React, {Component} from "react";

import StrapiService from "../../services/strapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemList from "../item-list";
import ItemDetails, {Record} from "../item-details";

import './serials-page.css';

export default class SerialsPage extends Component {

    strapiService = new StrapiService();

    state = {
        selectedItem: null,
        hasError: false
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    };

    render() {

        const {getAllSerials, getSerial} = this.strapiService;
        const {selectedItem} = this.state;

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={getAllSerials}>
                {(i) => `${i.name} (${i.seasons} seasons)`}
            </ItemList>
        );

        const itemDetails = (
            <ItemDetails itemId={selectedItem}
                         getData={getSerial}>
                <Record label ="Name" field="name" />
                <Record label ="Seasons" field="seasons" />
                <Record label ="Categories" field="categories" />
                <Record label ="Casts" field="casts" />
                <Record label ="Free Time" field="timeInterval" />
                <Record label ="Tagline" field="tagline" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={itemDetails}/>
            </ErrorBoundry>
        )
    }
};