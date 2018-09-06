import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    addUser(firstName: String, lastName: String): User
  }
`;
