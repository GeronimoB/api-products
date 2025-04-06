const { body, param } = require('express-validator');

const validateProductCreate = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must have at least 10 characters'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  
  body('available_quantity')
    .notEmpty().withMessage('Available quantity is required')
    .isInt({ gt: 0 }).withMessage('Available quantity must be a positive integer'),
];

const validateProductUpdate = [
  param('id')
    .isInt().withMessage('ID must be a valid integer'),
  
  body('name')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must have at least 10 characters'),
  
  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  
  body('available_quantity')
    .optional()
    .isInt({ gt: 0 }).withMessage('Available quantity must be a positive integer'),
];

const validateProductId = [
  param('id')
    .isInt().withMessage('ID must be a valid integer'),
];

module.exports = {
  validateProductCreate,
  validateProductUpdate,
  validateProductId
};