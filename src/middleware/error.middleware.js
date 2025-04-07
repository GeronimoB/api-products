const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');

// Middleware to check the results of express-validator
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  }
  next();
};

// Middleware to handle general errors
const errorHandler = (err, req, res, next) => {
  const errorInfo = {
    message: err.message,
    type: err.name || 'Error',
    path: req.path,
    method: req.method,
    statusCode: err.statusCode || 500
  };
  
  console.error('Error:', errorInfo);

  // Specific Sequelize validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Custom error with status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Default error (500 - Internal server error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

// Middleware for handling not found routes
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.originalUrl}`
  });
};

module.exports = {
  validateRequest,
  errorHandler,
  notFoundHandler
};