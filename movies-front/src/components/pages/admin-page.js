import React, { useState } from "react";
import Query from '../Query';
import { CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../queries/category/categories';
import { useMutation } from '@apollo/react-hooks';


const AdminPage = () => {

  const [category, setCategory] = useState('');

  const [createCategory] = useMutation(CREATE_CATEGORY, UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY, UPDATE_CATEGORY);

  const onHandleSubmit = (e) => {
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
      <h3 className="item-title">Categories</h3>
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
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Category Name" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
          </div>
          <button type="submit">
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;


