import React from "react";

import ItemDetails, {Record} from "../item-details";
import withStrapiService from "../hoc-helpers/with-strapi-service";

const MovieDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record label="Name" field="name"/>
            <Record label="Categories" field="categories"/>
            <Record label="Casts" field="casts"/>
            <Record label="Free Time" field="timeInterval"/>
        </ItemDetails>
    );
};

const mapMethodsToProps = (strapiService) => {
    return {
        getData: strapiService.getMovie
    }
};

export default withStrapiService(mapMethodsToProps)(MovieDetails);