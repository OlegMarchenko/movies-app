import React from 'react';
import { GET_NETFLIX_MOVIE } from '../../queries/netflix/netflixes';
import Query from '../Query';
import { preparationData } from '../../utils/preparationData';

const SinglePage = ({ match }) => {

  const { id } = match.params;

  return (
    <div className="single">
      <Query query={GET_NETFLIX_MOVIE} id={id}>
        {({ data: { netflix: { id, name, image, categories, casts, price } } }) => (
          <div key={id} className="item-details">
            <img src={`http://localhost:1337/${image.url}`} alt={name} title={name}
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
            </ul>
          </div>
        )}
      </Query>
    </div>
  )
};

export default SinglePage;