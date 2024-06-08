import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
