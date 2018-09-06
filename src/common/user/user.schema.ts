import { makeExecutableSchema } from 'graphql-tools';
import User from './user.model';

export const userTypeDefs = `
  type User {
    id: ID!
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  extend type Query {
    users(input: UserInput): [User]
    user(id: String!): User
  }

  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

interface IUserInput {
  firstName: string;
  lastName: string;
}

export const userResolvers: any = {
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
    editUser(_: any, { id, input }: { id: string; input: IUserInput }) {
      return User.findByIdAndUpdate(id, input);
    },
    deleteUser(_: any, { id }: { id: string }) {
      return User.findByIdAndRemove(id);
    },
  },
};

export default makeExecutableSchema({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
});
