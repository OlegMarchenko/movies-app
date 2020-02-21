import React, { useState } from 'react';
import Query from '../Query';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CAST, GET_CASTS, UPDATE_CASTS, DELETE_CAST } from '../../queries/cast/casts';

const AdminCasts = () => {

  const [cast, setCast] = useState('');
  const [createCast] = useMutation(CREATE_CAST, UPDATE_CASTS);
  const [deleteCast] = useMutation(DELETE_CAST, UPDATE_CASTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCast({ variables: { name: cast } });
    setCast('');
  };

  return (
    <div className="item-holder admin">
      <Query query={GET_CASTS}>
        {({ data: { casts } }) => (
          <ul className="item-list">
            {casts.map(({ id, name }) => (
                <li key={id}>
                  <span>{name}</span>
                  <button onClick={() => deleteCast({ variables: { id } })}>
                    <i className="fas fa-minus"></i>
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </Query>
      <div className="item-details">
        <form className="form-holder" onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group">
              <input type="text" placeholder="Name" value={cast} onChange={(e) => {
                setCast(e.target.value)
              }}/>
            </div>
          </div>
          <button type="submit" disabled={!cast}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    </div>
  )
};

export default AdminCasts;