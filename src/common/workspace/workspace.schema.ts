import Workspace from './workspace.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const workspaceTypeDefs = `

  type Workspace {
    id: ID!
    name: String!
    rating: Int
  }

  input WorkspaceInput {
    name: String
    rating: Int
  }

  input WorkspaceFilterInput {
    limit: Int
  }

  # Extending the root Query type.
  extend type Query {
    workspaces(filter: WorkspaceFilterInput): [Workspace]
    workspace(id: String!): Workspace
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addWorkspace(input: WorkspaceInput!): Workspace
  }

`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const workspaceResolvers: any = {
  Query: {
    async workspaces(_, { filter }) {
      const workspaces: any[] = await Workspace.find({}, null, filter);
      return workspaces.map(workspace => workspace.toGraph());
    },
    async workspace(_, { id }) {
      const workspace: any = await Workspace.findById(id);
      return workspace.toGraph();
    },
  },
  Mutation: {
    async addWorkspace(_, { input }) {
      const workspace: any = await Workspace.create(input);
      return workspace.toGraph();
    },
  },
};
