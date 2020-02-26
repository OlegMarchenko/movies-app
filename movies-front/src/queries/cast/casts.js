import gql from 'graphql-tag';

export const CREATE_CAST = gql`
    mutation createCast(
        $name: String!
    ) {
        createCast (
            input: {data: {name: $name}}
        ) {
            cast {
                id
                name
                created_at
                updated_at
            }
        }
    }
`;

export const GET_CASTS = gql`
    query casts {
        casts {
            id
            name
            created_at
            updated_at
        }
    }
`;

export const UPDATE_CASTS = {
  update(cache, { data: { createCast } }) {
    const { casts } = cache.readQuery({ query: GET_CASTS });
    cache.writeQuery({
      query: GET_CASTS,
      data: { casts: casts.concat([createCast]) },
    });
  },
  refetchQueries: [{ query: GET_CASTS }]
};

export const DELETE_CAST = gql`
    mutation deleteCast(
        $id: ID!
    ) {
        deleteCast (
            input: {where: {id: $id}}
        ) {
            cast {
                id
            }
        }
    }
`;

