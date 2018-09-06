import { makeExecutableSchema } from 'graphql-tools';
import Workspace from './workspace.model';

export const workspaceTypeDefs = `
  type Workspace {
    id: ID!
    name: String!
  }

  input WorkspaceInput {
    name: String
  }

  extend type Query {
    workspaces(input: WorkspaceInput): [Workspace]
    workspace(id: String!): Workspace
  }

  extend type Mutation {
    addWorkspace(input: WorkspaceInput!): Workspace
  }
`;

interface IWorkspaceInput {
  firstName: string;
  lastName: string;
}

export const workspaceResolvers: any = {
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
