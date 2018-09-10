import jwt from 'jsonwebtoken';
import User from './user.model';

export const userTypeDefs = `
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }

  extend type Query {
    users(input: UserInput): [User]
    user(id: String!): User
    loginUser(email: String!, password: String!): String
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
    async loginUser(
      _: any,
      { email, password }: { email: string; password: string },
      context: any
    ) {
      const user: any = await User.findOne({ email });
      const match: boolean = await user.comparePassword(password);
      if (match) {
        return jwt.sign({ id: user.id }, 'this is super secret');
      }
      throw new Error('Not Authorised.');
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
