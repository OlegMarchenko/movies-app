import React, { useState } from 'react';
import Query from '../Query';
import { useMutation } from '@apollo/react-hooks';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORIES,
  DELETE_CATEGORY
} from '../../queries/category/categories';

const AdminCategries = () => {

  const [category, setCategory] = useState('');
  const [createCategory] = useMutation(CREATE_CATEGORY, UPDATE_CATEGORIES);
  const [deleteCategory] = useMutation(DELETE_CATEGORY, UPDATE_CATEGORIES);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({
      variables: {
        name: category
      }
    });
    setCategory('');
  };

  return (
    <div className="item-holder admin">
      <Query query={GET_CATEGORIES}>
        {({ data: { categories } }) => {
          return (
            <ul className="item-list">
              {categories.map(({ id, name }) => {
                return (
                  <li key={id}>
                    <span>{name}</span>
                    <button onClick={() => {
                      deleteCategory({
                        variables: {
                          id
                        }
                      })
                    }}>
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
              <input type="text" placeholder="Category Name" value={category} onChange={(e) => {
                setCategory(e.target.value)
              }}/>
            </div>
          </div>
          <button type="submit" disabled={!category}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    </div>
  )
};

export default AdminCategries;