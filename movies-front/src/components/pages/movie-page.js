import React, { useState } from 'react';
import Query from '../Query';
import { preparationData, preparationTime } from '../../utils/preparationData';
import { history } from "../../utils/history";
import { GET_MOVIES, GET_MOVIE } from "../../queries/movie/movies";


const MoviePage = ({ match }) => {

  const { id } = match.params;
  const [movie, setMovie] = useState(id);

  const onItemSelected = (id) => {
    setMovie(id);
    history.push(`${id}`)
  };

  const checkData = movie;
  const withData = (
    <Query query={GET_MOVIE} id={movie}>
      {({ data: { movie: { id, name, image, categories, casts, movie_hours } } }) => (
        <div key={id} className="item-details">
          <img src={`https://nlt-movies.herokuapp.com/${image.url}`} alt={name} title={name}
               className="item-details-img"/>
          <ul className="item-details-desc">
            <li>
              <span>Name:</span>
              <p>{name}</p>
            </li>
            <li>
              <span>Categories:</span>
              <p>{preparationData(categories)}</p>
            </li>
            <li>
              <span>Casts:</span>
              <p>{preparationData(casts)}</p>
            </li>
            <li>
              <span>Free Time:</span>
              <p>{preparationTime(movie_hours)}</p>
            </li>
          </ul>
        </div>
      )}
    </Query>
  );
  const withoutData = <div className="item-details"><span>Select a movie from a list</span></div>;

  return (
    <div className="item-holder">
      <Query query={GET_MOVIES}>
        {({ data: { movies } }) => (
          <ul className="item-list">
            {movies.map(({ id, name }) => (
                <li key={id}
                    onClick={() => {
                      onItemSelected(id);
                    }}>
                  <span>{name}</span>
                </li>
              )
            )}
          </ul>
        )}
      </Query>
      {checkData ? withData : withoutData}
    </div>
  )
};

export default MoviePage;