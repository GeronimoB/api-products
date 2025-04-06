const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');
const Producto = require('../src/models/producto');

// Configurar base de datos de prueba antes de ejecutar los tests
beforeAll(async () => {
  // Usar una base de datos de prueba o un esquema separado
  await sequelize.sync({ force: true });
});

// Limpiar la base de datos después de cada test
afterEach(async () => {
  await Producto.destroy({ where: {}, truncate: true });
});

// Cerrar conexión después de todos los tests
afterAll(async () => {
  await sequelize.close();
});

describe('Pruebas de API de Productos', () => {
  describe('POST /api/productos', () => {
    it('Debería crear un nuevo producto', async () => {
      const productoData = {
        nombre: 'Producto de prueba',
        descripcion: 'Esta es una descripción de prueba con suficiente longitud',
        precio: 99.99,
        cantidad_disponible: 10
      };

      const response = await request(app)
        .post('/api/productos')
        .send(productoData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.nombre).toBe(productoData.nombre);
    });

    it('Debería retornar error 400 si los datos son inválidos', async () => {
      const productoInvalido = {
        nombre: 'P', // Nombre muy corto
        descripcion: 'Corta', // Descripción muy corta
        precio: -10, // Precio negativo
        cantidad_disponible: 0 // Cantidad inválida
      };

      const response = await request(app)
        .post('/api/productos')
        .send(productoInvalido)
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/productos', () => {
    it('Debería obtener una lista vacía de productos', async () => {
      const response = await request(app)
        .get('/api/productos')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBe(0);
    });

    it('Debería obtener una lista de productos después de agregarlos', async () => {
      // Crear un producto de prueba
      await Producto.create({
        nombre: 'Producto de prueba',
        descripcion: 'Esta es una descripción de prueba con suficiente longitud',
        precio: 99.99,
        cantidad_disponible: 10
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
    it('Debería obtener un producto por ID', async () => {
      // Crear un producto de prueba
      const producto = await Producto.create({
        nombre: 'Producto de prueba',
        descripcion: 'Esta es una descripción de prueba con suficiente longitud',
        precio: 99.99,
        cantidad_disponible: 10
      });

      const response = await request(app)
        .get(`/api/productos/${producto.id}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.id).toBe(producto.id);
    });

    it('Debería retornar 404 si el producto no existe', async () => {
      const response = await request(app)
        .get('/api/productos/9999')
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Producto no encontrado');
    });
  });

  describe('PUT /api/productos/:id', () => {
    it('Debería actualizar un producto existente', async () => {
      // Crear un producto de prueba
      const producto = await Producto.create({
        nombre: 'Producto inicial',
        descripcion: 'Esta es una descripción inicial con suficiente longitud',
        precio: 99.99,
        cantidad_disponible: 10
      });

      const actualizacion = {
        nombre: 'Producto actualizado',
        precio: 149.99
      };

      const response = await request(app)
        .put(`/api/productos/${producto.id}`)
        .send(actualizacion)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.nombre).toBe(actualizacion.nombre);
      expect(parseFloat(response.body.data.precio)).toBe(actualizacion.precio);
      // La descripción no debería cambiar
      expect(response.body.data.descripcion).toBe(producto.descripcion);
    });
  });

  describe('DELETE /api/productos/:id', () => {
    it('Debería eliminar un producto existente', async () => {
      // Crear un producto de prueba
      const producto = await Producto.create({
        nombre: 'Producto a eliminar',
        descripcion: 'Esta es una descripción del producto a eliminar con suficiente longitud',
        precio: 59.99,
        cantidad_disponible: 5
      });

      const response = await request(app)
        .delete(`/api/productos/${producto.id}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Producto eliminado exitosamente');

      // Verificar que el producto ya no exista
      const productoEliminado = await Producto.findByPk(producto.id);
      expect(productoEliminado).toBeNull();
    });
  });
});