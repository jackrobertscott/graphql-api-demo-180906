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

mongoose.connect(
  // replace with environment variable in production
  'mongodb://localhost/graphql-demo',
  { useNewUrlParser: true }
);

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs, petTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers, petResolvers),
});

const server = new ApolloServer({
  schema,
  async context({ req }: { req: any }) {
    const token = req && req.headers && req.headers.authorization;
    if (token) {
      const data: any = jwt.verify(token, 'this is super secret');
      const user = data.id ? await User.findById(data.id) : null;
      return { user };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
