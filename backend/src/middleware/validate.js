import { logger } from '../config/index.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const dataToValidate = {
        ...req.body,
        ...req.params,
        ...req.query,
      };

      const validatedData = schema.parse(dataToValidate);
      
      // Attach validated data to request
      req.validated = validatedData;
      next();
    } catch (error) {
      const errors = {};
      
      if (error.errors) {
        error.errors.forEach((err) => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });
      }

      logger.warn(`Validation error: ${JSON.stringify(errors)}`);
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.validated = validatedData;
      next();
    } catch (error) {
      const errors = {};
      
      if (error.errors) {
        error.errors.forEach((err) => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });
      }

      logger.warn(`Body validation error: ${JSON.stringify(errors)}`);
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.query);
      req.validated = { ...req.validated, ...validatedData };
      next();
    } catch (error) {
      const errors = {};
      
      if (error.errors) {
        error.errors.forEach((err) => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });
      }

      logger.warn(`Query validation error: ${JSON.stringify(errors)}`);
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.params);
      req.validated = { ...req.validated, ...validatedData };
      next();
    } catch (error) {
      const errors = {};
      
      if (error.errors) {
        error.errors.forEach((err) => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });
      }

      logger.warn(`Params validation error: ${JSON.stringify(errors)}`);
      
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};
