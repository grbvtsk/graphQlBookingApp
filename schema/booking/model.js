import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    realestate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Realestate',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    from: {
      type: Date,
      required: true,
      default: new Date(),
    },
    to: {
      type: Date,
      required: true,
      default: new Date().setDate(new Date().getDate() + 7),
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
