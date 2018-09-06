import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import workspace from './workspace.model';

const typeDefs = gql`
  type Workspace {
    id: ID!
    name: String
  }

  type Query {
    workspaces: [Workspace]
    workspace(id: String!): Workspace
  }

  type Mutation {
    addWorkspace(name: String): Workspace
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers: any = {
  Query: {
    workspaces() {
      return workspace.find({});
    },
    workspace(_: any, args: { id: string }) {
      return workspace.findById(args.id);
    },
  },
  Mutation: {
    addWorkspace(_: any, args: object) {
      return workspace.create(args);
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
