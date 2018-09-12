import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import rootTypeDefs from './root';
import { userResolvers, userTypeDefs } from './common/user/user.schema';
import {
  workspaceResolvers,
  workspaceTypeDefs,
} from './common/workspace/workspace.schema';
import { petResolvers, petTypeDefs } from './common/pet/pet.schema';
import User from './common/user/user.model';
import config from './config';

/**
 * Connect to the mongodb database using
 * the mongoose library.
 */
mongoose.connect(
  config.mongodb.uri,
  { useNewUrlParser: true }
);

/**
 * Declare the schema which the will hold our
 * GraphQL types and resolvers.
 */
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs, petTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers, petResolvers),
});

/**
 * Create the server which we will send our
 * GraphQL queries to.
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    console.log(error);
    return error;
  },
  async context({ req }) {
    const token = req && req.headers && req.headers.authorization;
    if (token) {
      const data: any = jwt.verify(token, config.token.secret);
      const user = data.id ? await User.findById(data.id) : null;
      return { user };
    }
  },
});

/**
 * Turn the server on by listening to a port
 * Defaults to: http://localhost:4000
 */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
