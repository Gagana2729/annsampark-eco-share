import User from '../models/User.js';
import Donation from '../models/Donation.js';

// @desc    Get user profile by ID
// @route   GET /api/users/profile/:id
// @access  Public
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message,
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role === 'donor') {
      // Get donor statistics
      const totalDonations = await Donation.countDocuments({ donorId: userId });
      const activeDonations = await Donation.countDocuments({ 
        donorId: userId, 
        status: { $in: ['available', 'claimed', 'in-transit'] } 
      });
      const completedDonations = await Donation.countDocuments({ 
        donorId: userId, 
        status: 'completed' 
      });

      // Calculate total items donated
      const donations = await Donation.find({ donorId: userId, status: 'completed' });
      const totalItems = donations.reduce((sum, donation) => sum + donation.quantity, 0);

      res.status(200).json({
        success: true,
        data: {
          totalDonations,
          activeDonations,
          completedDonations,
          totalItems,
          impactScore: req.user.impactScore,
        },
      });
    } else if (req.user.role === 'receiver') {
      // Get receiver statistics
      const claimedDonations = await Donation.countDocuments({ claimedBy: userId });
      const completedReceived = await Donation.countDocuments({ 
        claimedBy: userId, 
        status: 'completed' 
      });

      // Calculate total items received
      const donations = await Donation.find({ claimedBy: userId, status: 'completed' });
      const totalItems = donations.reduce((sum, donation) => sum + donation.quantity, 0);

      res.status(200).json({
        success: true,
        data: {
          claimedDonations,
          completedReceived,
          totalItems,
        },
      });
    } else {
      // Admin statistics
      const totalUsers = await User.countDocuments();
      const totalDonors = await User.countDocuments({ role: 'donor' });
      const totalReceivers = await User.countDocuments({ role: 'receiver' });
      const totalDonations = await Donation.countDocuments();
      const activeDonations = await Donation.countDocuments({ 
        status: { $in: ['available', 'claimed', 'in-transit'] } 
      });
      const completedDonations = await Donation.countDocuments({ status: 'completed' });

      res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalDonors,
          totalReceivers,
          totalDonations,
          activeDonations,
          completedDonations,
        },
      });
    }
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message,
    });
  }
};

// @desc    Verify user (admin only)
// @route   PUT /api/users/verify/:id
// @access  Private (Admin only)
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User verified successfully',
      data: user,
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying user',
      error: error.message,
    });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { role, verified } = req.query;

    let query = {};
    if (role) query.role = role;
    if (verified !== undefined) query.verified = verified === 'true';

    const users = await User.find(query)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};
