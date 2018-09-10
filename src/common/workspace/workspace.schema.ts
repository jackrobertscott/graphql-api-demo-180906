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

export const workspaceResolvers: any = {
  Query: {
    workspaces(_, { input, filter }) {
      return Workspace.find(input, null, {
        limit: filter && filter.limit,
      });
    },
    workspace(_, { id }) {
      return Workspace.findById(id);
    },
  },
  Mutation: {
    addWorkspace(_, { input }) {
      return Workspace.create(input);
    },
  },
};
