import User from './user.model';

export default {
  Query: {
    users() {
      return User.find({});
    },
    user(_: any, args: { id: string }) {
      return User.findById(args.id);
    },
  },
  Mutation: {
    addUser(_: any, args: object) {
      return User.create(args);
    },
  },
};
