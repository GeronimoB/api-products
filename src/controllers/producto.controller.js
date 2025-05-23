const Producto = require('../models/producto');

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, available_quantity } = req.body;
    
    // Simulate a delay to pause the process
    await new Promise(resolve => setTimeout(resolve, 2000));
    const producto = await Producto.create({
      name,
      description,
      price,
      available_quantity
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const { count, rows: productos } = await Producto.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });
    
    return res.status(200).json({
      status: 'success',
      data: productos,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    return res.status(200).json({
      status: 'success',
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, available_quantity } = req.body;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    // Only update provided fields
    await producto.update({
      name: name !== undefined ? name : producto.name,
      description: description !== undefined ? description : producto.description,
      price: price !== undefined ? price : producto.price,
      available_quantity: available_quantity !== undefined ? available_quantity : producto.available_quantity
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    await producto.destroy();
    
    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
