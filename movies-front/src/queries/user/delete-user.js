import gql from "graphql-tag";

const DELETE_USER = gql`
  mutation DeleteUser($input: deleteUserInput) {
      deleteUser(input: $input) {
          user {
              id
          }
      }
  }
`;

export default DELETE_USER;