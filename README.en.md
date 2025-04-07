📘 Este proyecto también está disponible en Español: [README.md](README.md)

# Products REST API

This is a REST API developed with Node.js, Express, and PostgreSQL that allows CRUD operations on a resource called "products".

## Features

- **RESTful Architecture**: Designed following REST principles.
- **Database**: PostgreSQL with Sequelize ORM.
- **Validations**: Implemented with express-validator.
- **Error Handling**: Custom middleware for error management.
- **Automated Testing**: Unit tests with Jest and Supertest.
- **Continuous Integration**: GitHub Actions configuration to run tests automatically.
- **Documentation**: Documented endpoints and structure.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
productos-api/
├── .github/               # GitHub Actions configuration
│   └── workflows/         # CI workflows
├── src/
│   ├── config/           # Database configuration
│   ├── controllers/      # Controllers 
│   ├── middleware/       # Custom middleware
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── validators/       # Validators
│   ├── app.js            # Express configuration
│   └── server.js         # Entry point
├── tests/                # Unit tests
├── .env                  # Environment variables (not versioned)
├── .env.example          # Example environment variables
├── .gitignore            # Files to ignore in Git
├── jest.config.js        # Jest configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd productos-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configurations.

4. Create the database in PostgreSQL with the following structure:
   ```sql
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

5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/productos | Create a new product |
| GET | /api/productos | Get all products |
| GET | /api/productos/:id | Get a product by ID |
| PUT | /api/productos/:id | Update an existing product |
| DELETE | /api/productos/:id | Delete a product |

## Usage Examples

### Create a product

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

### Get all products

```bash
curl -X GET http://localhost:3000/api/productos
```

### Get a product by ID

```bash
curl -X GET http://localhost:3000/api/productos/1
```

### Update a product

```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 549.99,
    "available_quantity": 45
  }'
```

### Delete a product

```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

## Running Tests

```bash
# For Unix/Linux/macOS systems:
npm test

# For Windows systems:
npm run test:windows
```

### Continuous Integration

This project is configured with GitHub Actions to automatically run tests on each push or pull request to the main/master branches. You can see the results in the "Actions" tab of the repository.

## Validations

- **name**: String, required, between 3 and 100 characters.
- **description**: String, required, minimum 10 characters.
- **price**: Number, required, positive value.
- **available_quantity**: Integer, required, positive value.

## Security

- Error middleware with secure logging (without exposing stack traces or internal paths)
- Structured and consistent error responses
- Strict validation of input data