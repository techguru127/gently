# Gently - Flexible Product Model

## JSONB vs EAV
I chose JSONB over EAV because JSONB is simpler, faster, and more flexible - though EAV is more normalized and better for joins.
To see about how an EAV schema could work here, check out the eav.sql file - it defines the normalized structure and a sample filter query (incomplete) to illustrate the tradeoffs.

| Aspect              | JSONB                         | EAV                            |
|---------------------|-------------------------------|---------------------------------|
| **Structure**       | Flat & flexible               | Normalized                     |
| **Schema changes**  | No migrations needed          | New rows per attribute         |
| **Read speed**      | Fast with GIN index           | Slower (join-heavy)            |
| **Write speed**     | Simple insert                 | Multiple inserts per product   |
| **Filtering**       | Fast with indexed fields      | Slower & more complex          |
| **Joins**           | Hard or not possible          | Easy                           |
| **Data types**      | Unchecked inside JSON         | Enforced per attribute         |
| **Constraints**     | No foreign keys               | Full constraint support        |
| **Maintainability** | Simple code                   | Complex queries & logic        |

## Setup

1. Create `.env` file from `.env.example`:

2. Set up databases:

- Create one database for development.
- Create another database for testing.

3. Install dependencies, run migrations, seed data, and start the development server:

```bash
npm install
npm run migrate
npm run seed
npm run dev
```

## API

### 1. Create Product

**POST** `http://localhost:3000/products`

- **Request**

```json
{
  "sku": "APPLE001",
  "name": "Red Apple",
  "attributes": {
    "color": "red",
    "size": "medium"
  }
}
```

### 2. Get Products Details by Id

**GET** `http://localhost:3000/products/1`


### 3. Get Products (with filtering)

**GET** `http://localhost:3000/products?color=red&size=medium`




## Testing

Run tests with Jest:

```bash
npm run test
```

Testing covers unit and integration scenarios for three APIs: creating a product, fetching product details by ID, and filtering by attributes.

## Improvements (if time allows)

- **Pagination and Sorting:** Implement pagination (`page`, `limit`) and sorting (`sortBy`, `order`).
- **Schema Validation:** Add JSON schema validation for incoming attributes.
- **Error Handling:** Standardize error responses for better client-side integration.
- **API Documentation:** Integrate Swagger or OpenAPI for interactive API documentation.

