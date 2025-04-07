const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');
const Producto = require('../src/models/producto');

// Set up the test database before running the tests
beforeAll(async () => {
  // Use a separate test database or schema
  await sequelize.sync({ force: true });
});

// Clean the database after each test
afterEach(async () => {
  await Producto.destroy({ where: {}, truncate: true });
});

// Close the connection after all tests
afterAll(async () => {
  await sequelize.close();
});

describe('Product API Tests', () => {
  describe('POST /api/productos', () => {
    it('Should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'This is a test description with sufficient length',
        price: 99.99,
        available_quantity: 10
      };

      const response = await request(app)
        .post('/api/productos')
        .send(productData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(productData.name);
    });

    it('Should return a 400 error if data is invalid', async () => {
      const invalidProduct = {
        name: 'P', 
        description: 'Short',
        price: -10, 
        available_quantity: 0 
      };

      const response = await request(app)
        .post('/api/productos')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/productos', () => {
    it('Should get an empty list of products', async () => {
      const response = await request(app)
        .get('/api/productos')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(0);
    });

    it('Should get a list of products after adding them', async () => {
      // Create a test product
      await Producto.create({
        name: 'Test Product',
        description: 'This is a test description with sufficient length',
        price: 99.99,
        available_quantity: 10
      });

      const response = await request(app)
        .get('/api/productos')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(1);
    });
  });

  describe('GET /api/productos/:id', () => {
    it('Should get a product by ID', async () => {
      // Create a test product
      const product = await Producto.create({
        name: 'Test Product',
        description: 'This is a test description with sufficient length',
        price: 99.99,
        available_quantity: 10
      });

      const response = await request(app)
        .get(`/api/productos/${product.id}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(product.id);
    });

    it('Should return a 404 if the product does not exist', async () => {
      const response = await request(app)
        .get('/api/productos/9999')
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Product not found');
    });
  });

  describe('PUT /api/productos/:id', () => {
    it('Should update an existing product', async () => {
      // Create a test product
      const product = await Producto.create({
        name: 'Initial Product',
        description: 'This is an initial description with sufficient length',
        price: 99.99,
        available_quantity: 10
      });

      const update = {
        name: 'Updated Product',
        price: 149.99
      };

      const response = await request(app)
        .put(`/api/productos/${product.id}`)
        .send(update)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.name).toBe(update.name);
      expect(parseFloat(response.body.data.price)).toBe(update.price);
      // The description should not change
      expect(response.body.data.description).toBe(product.description);
    });
  });

  describe('DELETE /api/productos/:id', () => {
    it('Should delete an existing product', async () => {
      // Create a test product
      const product = await Producto.create({
        name: 'Product to Delete',
        description: 'This is a description of the product to delete with sufficient length',
        price: 59.99,
        available_quantity: 5
      });

      const response = await request(app)
        .delete(`/api/productos/${product.id}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Product deleted successfully');

      // Verify that the product no longer exists
      const deletedProduct = await Producto.findByPk(product.id);
      expect(deletedProduct).toBeNull();
    });
  });
});