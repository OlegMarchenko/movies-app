import gql from 'graphql-tag';

export const CREATE_CATEGORY = gql`
    mutation createCategory(
        $name: String!
    ) {
        createCategory (
            input: {data: {name: $name}}
        ) {
            category {
                id
                name
                created_at
                updated_at
            }
        }
    }
`;

export const GET_CATEGORIES = gql`
    query categories {
        categories {
            id
            name
            created_at
            updated_at
        }
    }
`;

export const UPDATE_CATEGORIES = {
  update(cache, { data: { createCategory } }) {
    const { categories } = cache.readQuery({ query: GET_CATEGORIES });
    cache.writeQuery({
      query: GET_CATEGORIES,
      data: { categories: categories.concat([createCategory]) },
    });
  },
  refetchQueries: [{ query: GET_CATEGORIES }]
};


export const DELETE_CATEGORY = gql`
    mutation deleteCategory(
        $id: ID!
    ) {
        deleteCategory (
            input: {where: {id: $id}}
        ) {
            category {
                id
            }
        }
    }
`;
