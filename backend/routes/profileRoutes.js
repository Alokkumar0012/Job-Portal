// backend/routes/profileRoutes.js

import express from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js'; // like secority gourd

const router = express.Router();

// both are 'private' हैं, isi liye  'protect' middleware use karte hain
// 

// GET /api/profile/me - get my profile
router.get('/me', protect, getMyProfile);

// PUT /api/profile/me -  update my profile
router.put('/me', protect, updateMyProfile);

export default router;