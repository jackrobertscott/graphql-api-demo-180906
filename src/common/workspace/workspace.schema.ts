import { makeExecutableSchema } from 'graphql-tools';
import workspaceTypeDefs from './workspace.graphql';
import workspaceResolvers from './workspace.resolvers';

export default makeExecutableSchema({
  typeDefs: workspaceTypeDefs,
  resolvers: workspaceResolvers as any,
});
