import mongoose from 'mongoose';
import logger from './logger.js';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-db';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error(`Failed to disconnect from MongoDB: ${error.message}`);
  }
};

export default connectDB;
