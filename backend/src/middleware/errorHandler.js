import { logger } from '../config/index.js';

// Custom error class
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong MongoDB ID error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new AppError(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    err = new AppError(message, 409);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    err = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired';
    err = new AppError(message, 401);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).forEach((path) => {
      errors[path] = err.errors[path].message;
    });
    err = new AppError('Validation Error', 422);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors,
    });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${status} - ${message} - ${req.originalUrl}`);

  // Send error response
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

// Async error wrapper
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};
