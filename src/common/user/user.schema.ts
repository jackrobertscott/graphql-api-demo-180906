import jwt from 'jsonwebtoken';
import User from './user.model';
import config from '../../config';

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

export const userResolvers: any = {
  Query: {
    async users(_, { input }) {
      const users: any[] = await User.find(input);
      return users.map(user => user.toGraph());
    },
    async user(_, { id }: { id: string }) {
      const user: any = User.findById(id);
      return user.toGraph();
    },
    async loginUser(_, { email, password }) {
      const user: any = await User.findOne({ email });
      const match: boolean = await user.comparePassword(password);
      if (match) {
        return jwt.sign({ id: user.id }, config.token.secret);
      }
      throw new Error('Not Authorised.');
    },
  },
  Mutation: {
    addUser(_, { input }) {
      return User.create(input);
    },
    editUser(_, { id, input }) {
      return User.findByIdAndUpdate(id, input);
    },
    deleteUser(_, { id }: { id: string }) {
      return User.findByIdAndRemove(id);
    },
  },
};
