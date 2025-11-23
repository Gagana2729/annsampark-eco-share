import express from 'express';
import {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  getMyDonations,
  claimDonation,
  completeDonation,
} from '../controllers/donationController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';
import { uploadMultiple, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getDonations);
router.get('/:id', getDonation);

// Protected routes
router.post('/', protect, authorize('donor'), uploadMultiple, handleUploadError, createDonation);
router.get('/my/donations', protect, authorize('donor', 'receiver'), getMyDonations);

router.put('/:id', protect, authorize('donor'), updateDonation);
router.delete('/:id', protect, authorize('donor'), deleteDonation);
router.post('/:id/claim', protect, authorize('receiver'), claimDonation);
router.put('/:id/complete', protect, authorize('donor'), completeDonation);

export default router;
