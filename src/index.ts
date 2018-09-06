import { ApolloServer, gql } from 'apollo-server';
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

mongoose.connect(
  'mongodb://localhost/snippets',
  { useNewUrlParser: true }
);

const schema = makeExecutableSchema({
  typeDefs: [...rootTypeDefs, userTypeDefs, workspaceTypeDefs, petTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers, petResolvers),
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
