import { ApolloServer, gql } from 'apollo-server';
import { mergeSchemas } from 'graphql-tools';
import mongoose from 'mongoose';

import userSchema from './common/user/user.schema';
import workspaceSchema from './common/workspace/workspace.schema';

mongoose.connect(
  'mongodb://localhost/snippets',
  { useNewUrlParser: true }
);

const schema = mergeSchemas({
  schemas: [userSchema, workspaceSchema],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
