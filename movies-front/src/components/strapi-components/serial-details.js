import React from "react";

import ItemDetails, {Record} from "../item-details";
import withStrapiService from "../hoc-helpers/with-strapi-service";

const SerialDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record label="Name" field="name"/>
            <Record label="Seasons" field="seasons"/>
            <Record label="Categories" field="categories"/>
            <Record label="Casts" field="casts"/>
            <Record label="Free Time" field="timeInterval"/>
            <Record label="Tagline" field="tagline"/>
        </ItemDetails>
    );
};

const mapMethodsToProps = (strapiService) => {
    return {
        getData: strapiService.getSerial
    }
};

export default withStrapiService(SerialDetails, mapMethodsToProps);