import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectDB, logger } from './config/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

/**
 * Security Middleware
 */
// Helmet for security headers
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.,',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login/signup attempts per windowMs
  skipSuccessfulRequests: true,
  message: 'Too many authentication attempts, please try again later.',
});

app.use(generalLimiter);

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

/**
 * Compression Middleware
 */
app.use(compression());

/**
 * Request Logging Middleware
 */
app.use(requestLogger);

/**
 * Health Check Route
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
// Apply auth limiter to auth routes
app.use('/api/auth', authLimiter, authRoutes);

// Posts routes
app.use('/api/posts', postRoutes);

/**
 * Root route info
 */
app.get('/api', (req, res) => {
  res.json({
    message: 'Blog API - v1.0.0',
    documentation: 'https://github.com/yourusername/blog-backend',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      health: '/health',
    },
  });
});

/**
 * Error Handling Middleware
 */
// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

/**
 * Server Initialization
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const NODE_ENV = process.env.NODE_ENV || 'development';

    const server = app.listen(PORT, () => {
      logger.info(`====================================`);
      logger.info(`Server is running in ${NODE_ENV} mode`);
      logger.info(`Listening on port ${PORT}`);
      logger.info(`Environment: ${NODE_ENV}`);
      logger.info(`====================================`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, closing server gracefully...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, closing server gracefully...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export default app;
