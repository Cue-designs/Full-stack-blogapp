import jwt from 'jsonwebtoken';
import { jwtConfig, logger } from '../config/index.js';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is missing or invalid',
      });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
      
      // Fetch user from database
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      if (!user.isActive) {
        logger.warn(`Inactive user attempted login: ${user.email}`);
        return res.status(403).json({
          success: false,
          message: 'Account is inactive',
        });
      }

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Access token has expired',
        });
      }
      throw error;
    }
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

export const authOptional = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.slice(7);

    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    logger.error(`Optional auth check failed: ${error.message}`);
    next(); // Continue even if token is invalid
  }
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by user: ${req.user.email} (${req.user.role})`);
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    }

    next();
  };
};
