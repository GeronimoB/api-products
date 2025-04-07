const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/producto.routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Initialize the Express application
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Basic route to verify the API is working
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Products REST API is running correctly'
  });
});

// API routes
app.use('/api/productos', productoRoutes);

// Middleware to handle not found routes
app.use(notFoundHandler);

// Middleware to handle errors
app.use(errorHandler);

module.exports = app;
