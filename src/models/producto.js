const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Producto = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isPositive(value) {
        if (parseFloat(value) <= 0) {
          throw new Error('Price must be a positive value');
        }
      }
    }
  },
  available_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isPositiveInteger(value) {
        if (parseInt(value) <= 0 || !Number.isInteger(parseFloat(value))) {
          throw new Error('Available quantity must be a positive integer');
        }
      }
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Producto;