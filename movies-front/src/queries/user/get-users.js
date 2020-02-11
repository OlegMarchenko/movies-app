import gql from "graphql-tag";

const GET_USERS = gql`
    query Users {
        users {
            id
            username
            email
        }
    }
`;

export default GET_USERS;