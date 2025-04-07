const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { validateProductCreate, validateProductUpdate, validateProductId } = require('../validators/producto.validator');
const { validateRequest } = require('../middleware/error.middleware');

// Routes for products
router.post('/', validateProductCreate, validateRequest, productoController.createProduct);
router.get('/', productoController.getAllProducts);
router.get('/:id', validateProductId, validateRequest, productoController.getProductById);
router.put('/:id', validateProductUpdate, validateRequest, productoController.updateProduct);
router.delete('/:id', validateProductId, validateRequest, productoController.deleteProduct);

module.exports = router;