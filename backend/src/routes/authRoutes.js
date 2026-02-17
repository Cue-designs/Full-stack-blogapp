import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
  updateProfileSchema,
} from '../validators/index.js';
import {
  signup,
  login,
  refreshToken,
  logout,
  logoutAll,
  getProfile,
  updateProfile,
} from '../controllers/authController.js';

const router = express.Router();

/**
 * Authentication Routes
 */

// Signup
router.post('/signup', validateBody(signupSchema), signup);

// Login
router.post('/login', validateBody(loginSchema), login);

// Refresh token
router.post('/refresh', validateBody(refreshTokenSchema), refreshToken);

// Logout (requires authentication)
router.post('/logout', authMiddleware, logout);

// Logout from all devices (requires authentication)
router.post('/logout-all', authMiddleware, logoutAll);

/**
 * Protected Routes - User Profile
 */

// Get current user profile
router.get('/profile', authMiddleware, getProfile);

// Update profile
router.put('/profile', authMiddleware, validateBody(updateProfileSchema), updateProfile);

export default router;
