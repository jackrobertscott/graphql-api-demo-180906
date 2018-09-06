import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import User from './user.model';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type Query {
    users(input: UserInput): [User]
    user(id: String!): User
  }

  type Mutation {
    addUser(input: UserInput!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

interface IUserInput {
  firstName: string;
  lastName: string;
}

const resolvers: any = {
  Query: {
    users(_: any, { input }: { input: IUserInput }) {
      return User.find(input);
    },
    user(_: any, { id }: { id: string }) {
      return User.findById(id);
    },
  },
  Mutation: {
    addUser(_: any, { input }: { input: IUserInput }) {
      return User.create(input);
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
