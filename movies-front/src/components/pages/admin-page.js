import React from "react";
import Query from '../Query';
import CATEGORIES_QUERY from '../../queries/category/categories';


export const AdminPage = () => {

  return (
    <>
      <p>Admin</p>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <ul>
              {categories.map((category, i) => {
                return (
                  <li key={category.id}>
                    {category.name}
                  </li>
                )
              })};
            </ul>
          )
        }};
      </Query>
    </>
  )
};


