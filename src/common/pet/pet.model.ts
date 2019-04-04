import mongoose from 'mongoose';

/**
 * Here is the our pet schema which will be used to
 * validate the data sent to our database.
 */
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

/**
 * This property will ensure our virtuals (including "id")
 * are set on the user when we use it.
 */
petSchema.set('toObject', { getters: true, virtuals: true });

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Pet', petSchema);
