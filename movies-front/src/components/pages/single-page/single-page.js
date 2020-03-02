import React, { useEffect, useState } from 'react';
import { GET_NETFLIX_MOVIE } from '../../../queries/netflix/netflixes';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import './single-page.css';
import { useApolloClient } from '@apollo/react-hooks';
import Spinner from '../../spinner';


const SinglePage = (movie) => {

  const id = movie.match.params.id;
  const client = useApolloClient();
  client.writeData({ data: { id } });
  const idx = client.cache.data.data.ROOT_QUERY.id;

  console.log(client);


  const { data, loading, error } = useQuery(GET_NETFLIX_MOVIE, {
    variables: { id: parseInt(idx) }
  });

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (data) {
      setImageUrl(image.url);
      document.querySelector('#root').style.backgroundImage = 'linear-gradient(rgba(0,0,0,.6) 15%,rgba(0,0,0,.2) 40%,#000 90%)';
      return () => {
        document.body.style.backgroundImage = '';
        document.querySelector('#root').style.backgroundImage = '';
      }
    }
  });

  document.body.style.backgroundImage = `url(http://localhost:1337${imageUrl})`;


  if (loading) return <Spinner/>;
  if (error) return <p>`Error ${error.message}`</p>;

  const { name, image, imageMini, description, release, time, budget, Average } = data.netflix;


  return (
    <div className="single">
      <div className="item-details">
        <img src={`http://localhost:1337/${imageMini.url}`} alt={name}
             title={name}
             className="item-details-img"/>
        <ul className="item-details-desc">
          <h1>{name}</h1>
          <p>{description}</p>
          <li>
            <span>Original Release</span>
            <p>{release}</p>
          </li>
          <li>
            <span>Running Time:</span>
            <p>{time} mins</p>
          </li>
          <li>
            <span>Box Office</span>
            <p>{budget}</p>
          </li>
          <li>
            <span>Vote Average</span>
            <p>{Average}</p>
          </li>
        </ul>
      </div>
      <Link to={`/netflix/${idx}`}>Back to all Netflixes</Link>
    </div>
  )
};

export default SinglePage;