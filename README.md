# API REST de Productos

Esta es una API REST desarrollada en Node.js con Express y PostgreSQL que permite realizar operaciones CRUD sobre un recurso llamado "productos".

## Características

- **Arquitectura RESTful**: Diseñada siguiendo principios REST.
- **Base de datos**: PostgreSQL con Sequelize ORM.
- **Validaciones**: Implementadas con express-validator.
- **Manejo de errores**: Middleware personalizado para gestión de errores.
- **Pruebas automatizadas**: Test unitarios con Jest y Supertest.
- **Integración continua**: Configuración de GitHub Actions para ejecutar pruebas automáticamente.
- **Documentación**: Endpoints y estructura documentados.

## Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Estructura del proyecto

```
productos-api/
├── .github/               # Configuración de GitHub Actions
│   └── workflows/         # Flujos de trabajo para CI
├── src/
│   ├── config/           # Configuración de la base de datos
│   ├── controllers/      # Controladores 
│   ├── middleware/       # Middleware personalizado
│   ├── models/           # Modelos de datos
│   ├── routes/           # Rutas de la API
│   ├── validators/       # Validadores
│   ├── app.js            # Configuración de Express
│   └── server.js         # Punto de entrada
├── tests/                # Pruebas unitarias
├── .env                  # Variables de entorno (no versionado)
├── .env.example          # Ejemplo de variables de entorno
├── .gitignore            # Archivos a ignorar por Git
├── jest.config.js        # Configuración de Jest
├── package.json          # Dependencias y scripts
└── README.md             # Documentación del proyecto
```

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd productos-api
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con tus configuraciones.

4. Crea la base de datos en PostgreSQL con la siguiente estructura:
   ```bash
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  available_quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
   ```
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Productos

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | /api/productos | Crear un nuevo producto |
| GET | /api/productos | Obtener todos los productos |
| GET | /api/productos/:id | Obtener un producto por ID |
| PUT | /api/productos/:id | Actualizar un producto existente |
| DELETE | /api/productos/:id | Eliminar un producto |

## Ejemplos de uso

### Crear un producto

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone XYZ",
    "description": "High-end smartphone with excellent features",
    "price": 599.99,
    "available_quantity": 50
  }'
```

### Obtener todos los productos

```bash
curl -X GET http://localhost:3000/api/productos
```

### Obtener un producto por ID

```bash
curl -X GET http://localhost:3000/api/productos/1
```

### Actualizar un producto

```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 549.99,
    "available_quantity": 45
  }'
```

### Eliminar un producto

```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

## Ejecutar pruebas

```bash
# Para sistemas Unix/Linux/macOS:
npm test

# Para sistemas Windows:
npm run test:windows
```

### Integración continua

Este proyecto está configurado con GitHub Actions para ejecutar pruebas automáticamente en cada push o pull request a las ramas main/master. Puedes ver los resultados en la pestaña "Actions" del repositorio.

## Validaciones

- **name**: String, requerido, entre 3 y 100 caracteres.
- **description**: String, requerido, mínimo 10 caracteres.
- **price**: Número, requerido, valor positivo.
- **available_quantity**: Entero, requerido, valor positivo.

## Seguridad

- Middleware de error con registro seguro (sin exponer stack traces o rutas internas)
- Respuestas de error estructuradas y consistentes
- Validación estricta de entrada de datos