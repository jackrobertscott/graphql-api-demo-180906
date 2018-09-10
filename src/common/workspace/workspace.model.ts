import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

workspaceSchema.set('toObject', { virtuals: true });

workspaceSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

export default mongoose.model('Workspace', workspaceSchema);
