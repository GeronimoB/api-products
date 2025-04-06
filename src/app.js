const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/producto.routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Inicialización de la aplicación Express
const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Ruta básica para comprobar que la API está funcionando
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API REST de productos funcionando correctamente'
  });
});

// Rutas de la API
app.use('/api/productos', productoRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware para manejar errores
app.use(errorHandler);

module.exports = app;