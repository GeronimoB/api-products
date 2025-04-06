const { ValidationError } = require('sequelize');
const { validationResult } = require('express-validator');

// Middleware para verificar los resultados de express-validator
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

// Middleware para manejar errores generales
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores específicos de Sequelize
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'error',
      message: 'Error de validación',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Error personalizado con código de estado
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Error por defecto (500 - Error interno del servidor)
  return res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
};

// Error para recursos no encontrados
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `No se encontró la ruta: ${req.originalUrl}`
  });
};

module.exports = {
  validateRequest,
  errorHandler,
  notFoundHandler
};