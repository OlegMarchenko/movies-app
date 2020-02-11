import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation CreateUser($input: createUserInput) {
      createUser(input: $input) {
          user {
              id
              username
              email
              
          }
      }
  }
`;

export default CREATE_USER;