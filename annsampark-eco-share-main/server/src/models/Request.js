import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Index for finding requests by receiver
requestSchema.index({ receiverId: 1, createdAt: -1 });

// Index for finding requests by donation
requestSchema.index({ donationId: 1, status: 1 });

const Request = mongoose.model('Request', requestSchema);

export default Request;
