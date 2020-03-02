import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Query from '../Query';
import { preparationData } from '../../utils/preparationData';
import { history } from "../../utils/history";
import {
  GET_NETFLIX,
  GET_NETFLIX_MOVIE,
} from '../../queries/netflix/netflixes';
import { useApolloClient } from '@apollo/react-hooks';

const NetflixPage = ({ match }) => {

  const { id } = match.params;
  const [movie, setMovie] = useState(id);
  const client = useApolloClient();

  const onItemSelected = (id) => {
    setMovie(id);
    history.push(`${id}`)
  };

  const checkData = movie;
  const withoutData = <div className="item-details"><span>Select a movie from a list</span></div>;

  const withData = (
    <Query query={GET_NETFLIX_MOVIE} id={movie}>
      {({ data: { netflix: { id, name, imageMini, categories, casts, price } } }) => (
        <div key={id} className="item-details">
          <img src={`http://localhost:1337/${imageMini.url}`} alt={name} title={name}
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
              <span>Price:</span>
              <p>${price}</p>
            </li>
            <li>
              <span>Details:</span>
              <p>
                <Link
                  to={`single/${movie}/`}>
                  <i className="fas fa-external-link-alt"></i>
                </Link>
              </p>
            </li>
          </ul>
        </div>
      )}
    </Query>
  );

  return (
    <div className="item-holder">
      <Query query={GET_NETFLIX}>
        {({ data: { netflixes } }) => (
          <ul className="item-list">
            {netflixes.map(({ id, name }) => (
                <li key={id}
                    onClick={() => {
                      client.writeData({ data: { id } });
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

export default NetflixPage;