import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    system: {
      type: String,
      enum: ['water', 'food', 'luminosity', 'temperature'],
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Action', ActionSchema);
