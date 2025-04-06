require('dotenv').config();
const app = require('./app');
const { sequelize, testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Sincronizar la base de datos y luego iniciar el servidor
const startServer = async () => {
  try {
    // Testear la conexión a la base de datos
    await testConnection();
    
    // Sincronizar modelos con la base de datos
    // En producción, se debería usar Sequelize migrations en lugar de sync
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
      console.log(`API disponible en: http://localhost:${PORT}/api/productos`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();