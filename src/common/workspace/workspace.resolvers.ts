import workspace from './workspace.model';

export default {
  Query: {
    workspaces() {
      return workspace.find({});
    },
    workspace(_: any, args: { id: string }) {
      return workspace.findById(args.id);
    },
  },
  Mutation: {
    addWorkspace(_: any, args: object) {
      return workspace.create(args);
    },
  },
};
