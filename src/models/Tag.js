import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
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

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
