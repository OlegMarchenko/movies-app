import React, {Component} from "react";
import Row from "../row";
import {SerialList} from "../strapi-components";
import SerialDetails from "../strapi-components/serial-details";
import ErrorBoundry from "../error-boundry";


export default class SerialPage extends Component {

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
                    left={<SerialList onItemSelected={this.onItemSelected}/>}
                    right={<SerialDetails itemId={selectedItem}/>}
                />
            </ErrorBoundry>
        )
    }
}