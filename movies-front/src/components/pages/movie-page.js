import React from "react";
import Row from "../row";
import { MovieList, MovieDetails } from "../strapi-components";
import { history } from "../../utils/history";

const MoviePage = ({ match }) => {
  const { id } = match.params;
  return (
    <Row
      left={<MovieList onItemSelected={(id) => history.push(`${id}`)}/>}
      right={<MovieDetails itemId={id}/>}
    />
  )
};

export default MoviePage;