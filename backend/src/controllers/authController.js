import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/tokenUtils.js';
import { sendSuccess, sendError } from '../utils/responseUtils.js';
import { logger } from '../config/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * User Signup
 */
export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.validated;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn(`Signup attempt with existing email: ${email}`);
    throw new AppError('Email is already registered', 409);
  }

  // Create new user
  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  // Generate tokens
  const accessToken = generateAccessToken(user._id, user.email, user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to database
  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  logger.info(`New user registered: ${email}`);

  return sendSuccess(res, 201, 'Account created successfully', {
    user: user.toJSON(),
    tokens: {
      accessToken,
      refreshToken,
    },
  });
});

/**
 * User Login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.validated;

  // Find user and select password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    logger.warn(`Login attempt with non-existent email: ${email}`);
    throw new AppError('Invalid email or password', 401);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    logger.warn(`Failed login attempt for user: ${email}`);
    throw new AppError('Invalid email or password', 401);
  }

  // Check if account is active
  if (!user.isActive) {
    logger.warn(`Login attempt for inactive user: ${email}`);
    throw new AppError('Your account has been deactivated', 403);
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id, user.email, user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to database
  user.refreshTokens.push({ token: refreshToken });
  user.lastLogin = new Date();

  // Limit stored refresh tokens to 5
  if (user.refreshTokens.length > 5) {
    user.refreshTokens = user.refreshTokens.slice(-5);
  }

  await user.save();

  logger.info(`User logged in: ${email}`);

  return sendSuccess(res, 200, 'Login successful', {
    user: user.toJSON(),
    tokens: {
      accessToken,
      refreshToken,
    },
  });
});

/**
 * Refresh Access Token
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.validated;

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(token);

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if refresh token exists
    const tokenExists = user.refreshTokens.some((rt) => rt.token === token);
    if (!tokenExists) {
      logger.warn(`Invalid refresh token attempt for user: ${user.email}`);
      throw new AppError('Invalid refresh token', 401);
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id, user.email, user.role);

    return sendSuccess(res, 200, 'Token refreshed successfully', {
      accessToken,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    logger.error(`Token refresh failed: ${error.message}`);
    throw new AppError('Invalid refresh token', 401);
  }
});

/**
 * Logout
 */
export const logout = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const token = req.headers.authorization?.slice(7);

  if (token) {
    // Remove refresh token from database
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { refreshTokens: { token } },
      },
      { new: true }
    );
  }

  logger.info(`User logged out: ${req.user.email}`);

  return sendSuccess(res, 200, 'Logout successful');
});

/**
 * Logout from all devices
 */
export const logoutAll = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Clear all refresh tokens
  await User.findByIdAndUpdate(
    userId,
    {
      refreshTokens: [],
    },
    { new: true }
  );

  logger.info(`User logged out from all devices: ${req.user.email}`);

  return sendSuccess(res, 200, 'Logged out from all devices');
});

/**
 * Get current user profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return sendSuccess(res, 200, 'Profile retrieved successfully', user.toJSON());
});

/**
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, avatar } = req.validated;

  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (bio !== undefined) updateData['profile.bio'] = bio;
  if (avatar) updateData['profile.avatar'] = avatar;

  const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
    new: true,
    runValidators: true,
  });

  logger.info(`User profile updated: ${req.user.email}`);

  return sendSuccess(res, 200, 'Profile updated successfully', user.toJSON());
});

export default {
  signup,
  login,
  refreshToken,
  logout,
  logoutAll,
  getProfile,
  updateProfile,
};
