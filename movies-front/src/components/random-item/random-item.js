import React from "react";
import { useLocation } from "react-router-dom";
import Swiper from 'react-id-swiper';
import Query from '../Query';
import { sliderParams } from '../../utils/sliderParams';
import { preparationData, preparationTime } from '../../utils/preparationData';
import { GET_MOVIES } from '../../queries/movie/movies';

import 'swiper/css/swiper.css';
import './random-item.css';


const RandomItem = () => {

  let loc = useLocation();

  if (!loc.pathname.includes('/single/')) {
    return (
      <div className="slider-holder">
        <Query query={GET_MOVIES}>
          {({ data: { movies } }) => (
            <Swiper {...sliderParams}>
              {movies.map(({ id, name, image, categories, casts, movie_hours }) => (
                  <div key={id} className="slider-item">
                    <img src={`http://localhost:1337/${image.url}`} alt={name} title={name}
                         className="item-details-img"/>
                    <ul className="item-details-desc">
                      <li>
                        <span>Title: </span>
                        <p>{name}</p>
                      </li>
                      <li>
                        <span>Categories: </span>
                        <p>{preparationData(categories)}</p>
                      </li>
                      <li>
                        <span>Casts: </span>
                        <p>{preparationData(casts)}</p>
                      </li>
                      <li>
                        <span>Free Time: </span>
                        <p>{preparationTime(movie_hours)}</p>
                      </li>
                    </ul>
                  </div>
                )
              )}
            </Swiper>
          )}
        </Query>
      </div>
    )
  }
  return <></>
};

export default RandomItem;

