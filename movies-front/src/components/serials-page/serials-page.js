import React, {Component} from "react";

import StrapiService from "../../services/strapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemList from "../item-list";
import ItemDetails from "../item-details";

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
                         getData={getSerial} />
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={itemDetails}/>
            </ErrorBoundry>
        )
    }
};