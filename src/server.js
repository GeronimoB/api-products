require('dotenv').config();
const app = require('./app');
const { sequelize, testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Sync the database and then start the server
const startServer = async () => {
  try {
    // Test the database connection
    await testConnection();
    
    // Sync models with the database
    // In production, Sequelize migrations should be used instead of sync
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api/productos`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
