import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'annsampark/donations',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private (Donor only)
export const createDonation = async (req, res) => {
  try {
    const { type, itemName, quantity, description, location, expiryTime } = req.body;

    // Validate food expiry time
    if (type === 'food' && !expiryTime) {
      return res.status(400).json({
        success: false,
        message: 'Expiry time is required for food donations',
      });
    }

    // Parse location if it's a string
    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

    // Upload images to Cloudinary if provided
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      try {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
        imageUrls = await Promise.all(uploadPromises);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading images',
        });
      }
    }

    // Create donation
    const donation = await Donation.create({
      donorId: req.user._id,
      type,
      itemName,
      quantity,
      description,
      location: parsedLocation,
      expiryTime: expiryTime ? new Date(expiryTime) : undefined,
      images: imageUrls,
    });

    // Populate donor info
    await donation.populate('donorId', 'fullName email organizationName');

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation,
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donation',
      error: error.message,
    });
  }
};

// @desc    Get all donations with filters
// @route   GET /api/donations
// @access  Public
export const getDonations = async (req, res) => {
  try {
    const { type, status, lat, lng, radius } = req.query;

    // Build query
    let query = {};

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    } else {
      // Default to available donations
      query.status = 'available';
    }

    let donations;

    // If location is provided, find nearby donations
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const searchRadius = radius ? parseFloat(radius) : 50; // Default 50km

      donations = await Donation.find(query)
        .populate('donorId', 'fullName email organizationName phone')
        .populate('claimedBy', 'fullName email organizationName')
        .sort({ createdAt: -1 });

      // Calculate distances and filter by radius
      donations = donations
        .map(donation => {
          const dist = donation.distanceFrom(latitude, longitude);
          return {
            ...donation.toObject(),
            distance: parseFloat(dist),
          };
        })
        .filter(donation => donation.distance <= searchRadius)
        .sort((a, b) => a.distance - b.distance);
    } else {
      donations = await Donation.find(query)
        .populate('donorId', 'fullName email organizationName phone')
        .populate('claimedBy', 'fullName email organizationName')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message,
    });
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Public
export const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donorId', 'fullName email organizationName phone address')
      .populate('claimedBy', 'fullName email organizationName phone');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message,
    });
  }
};

// @desc    Update donation
// @route   PUT /api/donations/:id
// @access  Private (Donor - own donations only)
export const updateDonation = async (req, res) => {
  try {
    let donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    // Check if user is the donor
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this donation',
      });
    }

    // Don't allow updates if donation is claimed or completed
    if (['claimed', 'in-transit', 'completed'].includes(donation.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update donation in current status',
      });
    }

    const { itemName, quantity, description, location, expiryTime } = req.body;

    if (itemName) donation.itemName = itemName;
    if (quantity) donation.quantity = quantity;
    if (description) donation.description = description;
    if (location) donation.location = typeof location === 'string' ? JSON.parse(location) : location;
    if (expiryTime) donation.expiryTime = new Date(expiryTime);

    await donation.save();

    res.status(200).json({
      success: true,
      message: 'Donation updated successfully',
      data: donation,
    });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating donation',
      error: error.message,
    });
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private (Donor - own donations only)
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    // Check if user is the donor
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this donation',
      });
    }

    // Don't allow deletion if donation is in-transit or completed
    if (['in-transit', 'completed'].includes(donation.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete donation in current status',
      });
    }

    await donation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully',
    });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donation',
      error: error.message,
    });
  }
};

// @desc    Get user's donations
// @route   GET /api/donations/my-donations
// @access  Private (Donor)
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id })
      .populate('claimedBy', 'fullName email organizationName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message,
    });
  }
};

// @desc    Claim a donation
// @route   POST /api/donations/:id/claim
// @access  Private (Receiver only)
export const claimDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Donation is not available',
      });
    }

    // Update donation status
    donation.status = 'claimed';
    donation.claimedBy = req.user._id;
    donation.claimedAt = new Date();
    await donation.save();

    // Create notification for donor
    await Notification.create({
      userId: donation.donorId,
      type: 'donation_claimed',
      message: `Your donation "${donation.itemName}" has been claimed by ${req.user.fullName}`,
      relatedDonation: donation._id,
      relatedUser: req.user._id,
    });

    await donation.populate('donorId', 'fullName email organizationName phone');

    res.status(200).json({
      success: true,
      message: 'Donation claimed successfully',
      data: donation,
    });
  } catch (error) {
    console.error('Claim donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error claiming donation',
      error: error.message,
    });
  }
};

// @desc    Mark donation as completed
// @route   PUT /api/donations/:id/complete
// @access  Private (Donor - own donations only)
export const completeDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }

    // Check if user is the donor
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this donation',
      });
    }

    if (donation.status !== 'claimed' && donation.status !== 'in-transit') {
      return res.status(400).json({
        success: false,
        message: 'Donation must be claimed or in-transit to be completed',
      });
    }

    donation.status = 'completed';
    donation.completedAt = new Date();
    await donation.save();

    // Update donor's impact score
    const donor = await User.findById(donation.donorId);
    donor.impactScore += donation.quantity;
    await donor.save();

    // Create notification for receiver
    if (donation.claimedBy) {
      await Notification.create({
        userId: donation.claimedBy,
        type: 'donation_completed',
        message: `Donation "${donation.itemName}" has been marked as completed`,
        relatedDonation: donation._id,
        relatedUser: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation marked as completed',
      data: donation,
    });
  } catch (error) {
    console.error('Complete donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing donation',
      error: error.message,
    });
  }
};
