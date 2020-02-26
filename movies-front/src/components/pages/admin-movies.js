import React, { useState } from 'react';
import Query from '../Query';
import { CREATE_MOVIE, GET_MOVIES, UPDATE_MOVIES } from '../../queries/movie/movies';
import { useMutation } from '@apollo/react-hooks';

const AdminMovies = () => {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const [createMovie] = useMutation(CREATE_MOVIE, UPDATE_MOVIES);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie({
      variables: {
        name,
        image,
      }
    });
    setName('');
    setImage('');

  };

  return (
    <div className="item-holder admin">
      <Query query={GET_MOVIES}>
        {({ data: { movies } }) => {
          return (
            <ul className="item-list">
              {movies.map(({ id, name }) => {
                return (
                  <li key={id}>
                    <span>{name}</span>
                    <button>
                      <i className="fas fa-minus"></i>
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        }}
      </Query>
      <div className="item-details">
        <form className="form-holder" onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group">
              <input type="text" placeholder="Name" value={name} onChange={(e) => {
                setName(e.target.value)
              }}/>
            </div>

            <div className="form-group">
              <input type="file" placeholder="Choose Image" value={image} onChange={(e) => {
                setImage(e.target.value)
              }}/>
            </div>
          </div>
          <button type="submit">
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    </div>
  )
};

export default AdminMovies;