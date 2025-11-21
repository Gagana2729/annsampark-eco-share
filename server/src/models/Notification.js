import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [
      'donation_posted',
      'request_received',
      'request_accepted',
      'request_rejected',
      'donation_completed',
      'donation_claimed',
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  relatedDonation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for finding user's notifications
notificationSchema.index({ userId: 1, createdAt: -1 });

// Index for unread notifications
notificationSchema.index({ userId: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
