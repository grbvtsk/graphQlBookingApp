import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownedRealestates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Realestate',
    },
  ],
});

export default mongoose.model('User', userSchema);
