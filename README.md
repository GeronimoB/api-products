# API REST de Productos

Esta es una API REST desarrollada en Node.js con Express y PostgreSQL que permite realizar operaciones CRUD sobre un recurso llamado "productos".

## Características

- **Arquitectura RESTful**: Diseñada siguiendo principios REST.
- **Base de datos**: PostgreSQL con Sequelize ORM.
- **Validaciones**: Implementadas con express-validator.
- **Manejo de errores**: Middleware personalizado para gestión de errores.
- **Pruebas**: Test unitarios con Jest y Supertest.
- **Documentación**: Endpoints y estructura documentados.

## Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Estructura del proyecto

```
productos-api/
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

4. Crear la base de datos:
   ```bash
   createdb productos_db
   ```
   O crea la base de datos manualmente con PostgreSQL.

5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Productos

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/productos | Obtener todos los productos |
| GET | /api/productos/:id | Obtener un producto por ID |
| POST | /api/productos | Crear un nuevo producto |
| PUT | /api/productos/:id | Actualizar un producto existente |
| DELETE | /api/productos/:id | Eliminar un producto |

## Ejemplos de uso

### Crear un producto

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Smartphone XYZ",
    "descripcion": "Smartphone de última generación con excelentes características",
    "precio": 599.99,
    "cantidad_disponible": 50
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
    "precio": 549.99,
    "cantidad_disponible": 45
  }'
```

### Eliminar un producto

```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

## Ejecutar pruebas

```bash
npm test
```

## Validaciones

- **nombre**: String, requerido, entre 3 y 100 caracteres.
- **descripcion**: String, requerido, mínimo 10 caracteres.
- **precio**: Número, requerido, valor positivo.
- **cantidad_disponible**: Entero, requerido, valor positivo.

## Mejoras futuras

- Implementación de autenticación y autorización
- Documentación de API con Swagger
- Implementación de caché para optimizar consultas frecuentes
- Dockerización de la aplicación
- CI/CD para pruebas automáticas y despliegue

## Licencia

Este proyecto está bajo la Licencia ISC.