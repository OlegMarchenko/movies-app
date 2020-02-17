import gql from 'graphql-tag';

export const GET_USERS = gql`
    query users {
        users {
            id
            username
            email
        }
    }
`;

export const REGISTER_USER = gql`
    mutation registerUser (
        $username: String!
        $email: String!
        $password: String!
        $confirmed: Boolean
    ) {
        register (
            input: {
                username: $username 
                email: $email 
                password: $password
                confirmed: $confirmed
            }
        ) {
            jwt
            user {
                id username email
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($input: deleteUserInput) {
        deleteUser(input: $input) {
            user {
                id
            }
        }
    }
`;
