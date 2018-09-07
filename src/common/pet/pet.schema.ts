import { makeExecutableSchema } from 'graphql-tools';
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

const petToObject = (pet: any) => ({
  ...pet.toObject(),
  id: pet._id.toString(),
  userId: pet.userId.toString(),
});

export const petResolvers: any = {
  Query: {
    async pets(_: any, { input }: { input: IPetInput }) {
      const pets = await Pet.find(input);
      return pets.map(petToObject);
    },
    pet(_: any, { id }: { id: string }) {
      return Pet.findById(id);
    },
  },
  Mutation: {
    async addPet(_: any, { input }: { input: IPetInput }) {
      const pet: any = await Pet.create(input);
      return petToObject(pet);
    },
  },
  Pet: {
    user(pet: { userId: string }) {
      return pet.userId ? User.findById(pet.userId) : null;
    },
  },
};
