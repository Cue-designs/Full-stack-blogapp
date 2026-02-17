import jwt from 'jsonwebtoken';
import { jwtConfig, logger } from '../config/index.js';

/**
 * Generate access token
 */
export const generateAccessToken = (userId, email, role) => {
  try {
    const token = jwt.sign(
      {
        userId,
        email,
        role,
        type: 'access',
      },
      jwtConfig.accessTokenSecret,
      {
        expiresIn: jwtConfig.accessTokenExpiry,
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate access token: ${error.message}`);
    throw error;
  }
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        userId,
        type: 'refresh',
      },
      jwtConfig.refreshTokenSecret,
      {
        expiresIn: jwtConfig.refreshTokenExpiry,
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate refresh token: ${error.message}`);
    throw error;
  }
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
    return decoded;
  } catch (error) {
    logger.error(`Access token verification failed: ${error.message}`);
    throw error;
  }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.refreshTokenSecret);
    return decoded;
  } catch (error) {
    logger.error(`Refresh token verification failed: ${error.message}`);
    throw error;
  }
};

/**
 * Decode token without verification (for debugging)
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error(`Token decoding failed: ${error.message}`);
    return null;
  }
};

// Export all
export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
