import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import User from './user.model';

const typeDefs = gql`
  type User {
    id: ID!
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

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers: any = {
  Query: {
    users() {
      return User.find({});
    },
    user(_: any, args: { id: string }) {
      return User.findById(args.id);
    },
  },
  Mutation: {
    addUser(_: any, args: object) {
      return User.create(args);
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
