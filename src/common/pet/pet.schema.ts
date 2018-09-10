import Pet from './pet.model';
import User from '../user/user.model';

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
  extend type Query {
    pets(input: PetInput): [Pet]
    pet(id: String!): Pet
  }
  extend type Mutation {
    addPet(input: PetInput!): Pet
  }
`;

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
    user(pet: { userId: string }) {
      return pet.userId ? User.findById(pet.userId) : null;
    },
  },
};
