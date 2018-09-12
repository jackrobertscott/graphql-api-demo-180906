# GraphQL API Demo

> Demo implementation of a GraphQL server.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository was made in conjuction with [this tutorial](https://medium.com/@jackrobertscott/graphql-zero-to-production-a7c4f786a57b). Use this repository as an example for building your own GraphQL capable APIs.

## Highlights

- Uses [mongoose](https://github.com/Automattic/mongoose) for data validation.
- Fully functional GraphQL query and mutation system with [apollo-server](https://github.com/apollographql/apollo-server).
- Nested queries for related database items.

## Install

Clone the repository to your computer and move into the root directory.

```sh
git clone https://github.com/jackrobertscott/graphql-api-demo.git && cd graphql-api-demo
```

Install the dependencies.

```sh
npm install
```

Run the server in development mode.

```sh
npm run dev
```

While in development mode; the app will listen for changes and reload automatically.

## Production

This repository uses [TypeScript](https://www.typescriptlang.org/). As such, you will need to compile it before you run the production version.

```sh
npm run compile && npm run start
```

Or alternatively, use typescript in production (this uses [ts-node](https://github.com/TypeStrong/ts-node)).

```sh
npm run start:ts
```

## Examples

Here are some example queries which you can use as a starting point when using the playground.

```graphql
query GetWorkspaces {
  workspaces {
    id
    name
  }
}
mutation CreateWorkspace {
  addWorkspace(input: { name: "Cool Workspace" }) {
    name
  }
}
query GetUsersWithWorkspaces {
  users {
    id
    workspaceId
    workspace {
      name
    }
  }
}
mutation UpdateUserWithWorkspace {
  editUser(id: "<INSERT_A_USER_ID_HERE>", input: {
    workspaceId: "<INSERT_A_WORKSPACE_ID_HERE>"
  }) {
  	workspace {
      name
    } 
  }
}
```

## Authors

- [Jack Scott](https://twitter.com/jacrobsco)