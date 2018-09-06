import { makeExecutableSchema } from 'graphql-tools';
import Pet from './pet.model';
import User from '../user/user.model';

export const petTypeDefs = `
  type Pet {
    id: ID!
    name: String!
    userId: ID!
    user: User
  }

  input PetInput {
    name: String
    userId: ID
    user: User
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
  firstName: string;
  lastName: string;
}

export const petResolvers: any = {
  Query: {
    pets(_: any, { input }: { input: IPetInput }) {
      return Pet.find(input);
    },
    pet(_: any, { id }: { id: string }) {
      return Pet.findById(id);
    },
  },
  Mutation: {
    addPet(_: any, { input }: { input: IPetInput }) {
      return Pet.create(input);
    },
  },
  Pet: {
    user(pet: { userId: string }) {
      return User.findById(pet.userId);
    },
  },
};
