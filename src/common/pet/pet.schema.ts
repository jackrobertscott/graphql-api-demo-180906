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

interface IPetInput {
  name: string;
  userId: string;
}

export const petResolvers: any = {
  Query: {
    async pets(_: any, { input }: { input: IPetInput }) {
      const pets: any[] = await Pet.find(input);
      return pets.map(pet => pet.toGraph());
    },
    async pet(_: any, { id }: { id: string }) {
      const pet: any = await Pet.findById(id);
      return pet.toGraph();
    },
  },
  Mutation: {
    async addPet(_: any, { input }: { input: IPetInput }) {
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
