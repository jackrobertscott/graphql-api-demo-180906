import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import Workspace from './workspace.model';

const typeDefs = gql`
  type Workspace {
    id: ID!
    name: String!
  }

  input WorkspaceInput {
    name: String
  }

  type Query {
    workspaces(input: WorkspaceInput): [Workspace]
    workspace(id: String!): Workspace
  }

  type Mutation {
    addWorkspace(input: WorkspaceInput!): Workspace
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

interface IWorkspaceInput {
  firstName: string;
  lastName: string;
}

const resolvers: any = {
  Query: {
    workspaces(_: any, { input }: { input: IWorkspaceInput }) {
      return Workspace.find(input);
    },
    workspace(_: any, { id }: { id: string }) {
      return Workspace.findById(id);
    },
  },
  Mutation: {
    addWorkspace(_: any, { input }: { input: IWorkspaceInput }) {
      return Workspace.create(input);
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
