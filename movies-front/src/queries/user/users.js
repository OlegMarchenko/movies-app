import gql from 'graphql-tag';

export const REGISTER_USER = gql`
    mutation registerUser (
        $username: String!
        $email: String!
        $password: String
    ) {
        register (
            input: {
                username: $username
                email: $email
                password: $password
            }
        ) {
            jwt
            user {
                id username email
            }
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            id
            username
        }
    }
`;


export const UPDATE_USERS = {
  update(cache, { data: { register } }) {
    const { users } = cache.readQuery({ query: GET_USERS });
    cache.writeQuery({
      query: GET_USERS,
      data: { categories: users.concat([register]) },
    });
  },
  refetchQueries: [{ query: GET_USERS }]
};

export const DELETE_USER = gql`
    mutation deleteUser(
        $id: ID!
    ) {
        deleteUser(
            input: {where: {id: $id}}
        ) {
            user {
                id
            }
        }
    }
`;