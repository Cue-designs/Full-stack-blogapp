/**
 * Send a successful response
 */
export const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a paginated response
 */
export const sendPaginatedSuccess = (
  res,
  data,
  pagination = {},
  statusCode = 200,
  message = 'Success'
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: pagination.total || 0,
      pages: pagination.pages || Math.ceil((pagination.total || 0) / (pagination.limit || 10)),
    },
  });
};

/**
 * Send an error response
 */
export const sendError = (res, statusCode = 500, message = 'Error', errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response
 */
export const sendValidationError = (res, errors, message = 'Validation failed') => {
  return res.status(422).json({
    success: false,
    message,
    errors,
  });
};

export default {
  sendSuccess,
  sendPaginatedSuccess,
  sendError,
  sendValidationError,
};
