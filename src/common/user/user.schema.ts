import { makeExecutableSchema } from 'graphql-tools';
import userTypeDefs from './user.graphql';
import userResolvers from './user.resolvers';

export default makeExecutableSchema({
  typeDefs: userTypeDefs,
  resolvers: userResolvers as any,
});
