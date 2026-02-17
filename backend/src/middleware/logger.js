import morgan from 'morgan';
import logger from '../config/logger.js';

// Custom morgan token for user
morgan.token('user', (req) => {
  return req.user ? req.user.email : 'anonymous';
});

// Custom morgan format
const morganFormat = ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Stream for morgan to write logs
const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Morgan middleware
export const requestLogger = morgan(morganFormat, {
  stream,
  skip: (req) => {
    // Skip logging for health checks
    return req.url === '/health';
  },
});

export default requestLogger;
