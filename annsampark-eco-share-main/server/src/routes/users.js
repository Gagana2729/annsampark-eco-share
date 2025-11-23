import express from 'express';
import {
  getUserProfile,
  getUserStats,
  verifyUser,
  getAllUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Protected routes
router.get('/profile/:id', protect, getUserProfile);
router.get('/stats', protect, getUserStats);

// Admin only routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/verify/:id', protect, authorize('admin'), verifyUser);

export default router;
