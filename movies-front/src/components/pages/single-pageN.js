import React, { useEffect, useState } from 'react';
import { GET_NETFLIX_MOVIE } from '../../queries/netflix/netflixes';
import Query from '../Query';
import { preparationData } from '../../utils/preparationData';

const SinglePageN = (props) => {

  const id = props.location.id;
  console.log(props, 'id');

  const movie = useSelector(state => state.movies.list.find(item => item.id === id));

  return (
    <div className="single">
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
    </div>
  )
};

export default SinglePageN;