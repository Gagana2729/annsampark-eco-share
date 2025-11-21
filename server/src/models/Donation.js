import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['food', 'books', 'clothes'],
    required: [true, 'Donation type is required'],
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  description: {
    type: String,
    trim: true,
  },
  images: [{
    type: String, // Cloudinary URLs
  }],
  location: {
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  expiryTime: {
    type: Date,
    // Only required for food items, validated in controller
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'in-transit', 'completed', 'cancelled'],
    default: 'available',
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  claimedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for geospatial queries
donationSchema.index({ 'location.coordinates': '2dsphere' });

// Index for filtering by type and status
donationSchema.index({ type: 1, status: 1 });

// Index for donor's donations
donationSchema.index({ donorId: 1, createdAt: -1 });

// Virtual for checking if donation is expired (for food)
donationSchema.virtual('isExpired').get(function() {
  if (this.type === 'food' && this.expiryTime) {
    return new Date() > this.expiryTime;
  }
  return false;
});

// Method to calculate distance from a point (in kilometers)
donationSchema.methods.distanceFrom = function(lat, lng) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat - this.location.coordinates.lat) * Math.PI / 180;
  const dLng = (lng - this.location.coordinates.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.location.coordinates.lat * Math.PI / 180) *
    Math.cos(lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance.toFixed(2);
};

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
