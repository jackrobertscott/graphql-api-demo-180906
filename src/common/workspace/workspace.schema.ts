import Workspace from './workspace.model';

export const workspaceTypeDefs = `
  type Workspace {
    id: ID!
    name: String!
  }
  input WorkspaceInput {
    name: String
  }
  input FilterInput {
    limit: Int
  }
  extend type Query {
    workspaces(input: WorkspaceInput, filter: FilterInput): [Workspace]
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

interface IFilter {
  limit: number;
}

export const workspaceResolvers: any = {
  Query: {
    workspaces(
      _: any,
      { input, filter }: { input: IWorkspaceInput; filter: IFilter }
    ) {
      return Workspace.find(input, null, {
        limit: filter && filter.limit,
      });
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
