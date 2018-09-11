import Pet from './pet.model';
import User from '../user/user.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const petTypeDefs = `

  type Pet {
    id: ID!
    name: String!
    userId: ID
    user: User
  }

  input PetInput {
    name: String!
    userId: ID!
  }

  # Extending the root Query type.
  extend type Query {
    pets(input: PetInput): [Pet]
    pet(id: String!): Pet
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addPet(input: PetInput!): Pet
  }

`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which Apollo will resolve for us.
 * 2. The resolver property names match exactly with the schema types.
 */
export const petResolvers: any = {
  Query: {
    async pets(_, { input }) {
      const pets: any[] = await Pet.find(input);
      return pets.map(pet => pet.toGraph());
    },
    async pet(_, { id }) {
      const pet: any = await Pet.findById(id);
      return pet.toGraph();
    },
  },
  Mutation: {
    async addPet(_, { input }) {
      const pet: any = await Pet.create(input);
      return pet.toGraph();
    },
  },
  Pet: {
    async user(pet: { userId: string }) {
      if (pet.userId) {
        const user: any = await User.findById(pet.userId);
        return user.toGraph();
      }
      return null;
    },
  },
};
