import { gql } from 'apollo-server';

export default gql`
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
