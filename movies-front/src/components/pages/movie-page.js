import React from "react";
import {withRouter} from 'react-router-dom';
import Row from "../row";
import {MovieList, MovieDetails} from "../strapi-components";

const MoviePage = ({ history, match }) => {
    const {id} = match.params;
    return (
        <Row
            left={<MovieList onItemSelected={(id) => history.push(`${id}`)}/>}
            right={<MovieDetails itemId={id} />}
        />
    )
};

export default withRouter(MoviePage);