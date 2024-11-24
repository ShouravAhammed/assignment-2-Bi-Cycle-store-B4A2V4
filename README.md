# Bicycle Store B4A2V4

## Objective

The Bicycle Store B4A2V4 is a backend Express.js application built with TypeScript and MongoDB. It manages bicycles and customer orders efficiently using Mongoose for schema validation and database interaction.

## Firstly Setup ## ESLint and Prettier

To maintain code quality and formatting consistency, this project uses ESLint and Prettier.

## Features

1. **Product Management**:
   - Create a new bicycle.
   - Retrieve all bicycles, or search by name, brand, or type.
   - Get details of a specific bicycle by ID.
   - Update bicycle details (price, quantity, etc.).
   - Delete a bicycle.
2. **Order Management**:

   - Place an order for a bicycle.
   - Automatically manage stock: reduce quantity and update `inStock` status.
   - Handle insufficient stock scenarios.
     And use `timestamps: true` to both model
     When a document is saved for the first time, both createdAt and updatedAt are set to the current date and time.
     When a document is modified and saved again, only the updatedAt field is updated to the current date and time.

3. **Revenue Calculation**:

   - Calculate total revenue from all orders using aggregation pipelines.
     `  const result = await OrderModel.aggregate([
  {
    $group: {
      _id: null, // Group by null to calculate total for all documents
      totalRevenue: { $sum: '$totalPrice' }, // Sum up the totalPrice field
    },
  },
])
return result`

4. **Error Handling**:
   - Unified error responses with detailed messages and validation errors.

## Example Endpoints

### Products

- **Create a Bicycle**: `POST /api/products`
- **Get All Bicycles**: `GET /api/products?searchTerm=<type>`
- **Get Specific Bicycle**: `GET /api/products/:productId`
- **Update Bicycle**: `PUT /api/products/:productId`
- **Delete Bicycle**: `DELETE /api/products/:productId`

### Orders

- **Place an Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

#### Access the API

The API will run on `http://localhost:5000` by default.

### Technologies Used

Backend Framework: Express.js (TypeScript)
Database: MongoDB with Mongoose
Validation: Mongoose Schema Validation, Zod

#### Here is my "scripts": {

    "build": "tsc",
    "start:pro": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --ignore-path .gitignore --write \"./src**/*.+(js|ts|json)\"",
    "format:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"

},

#### Here is my installation

"dependencies": {
"-": "^0.0.1",
"cors": "^2.8.5",
"D": "^1.0.0",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"mongodb": "^6.10.0",
"mongoose": "^8.8.2",
"ts-node-dev": "^2.0.0",
"zod": "^3.23.8"
},
"devDependencies": {
"@eslint/js": "^9.15.0",
"@types/cors": "^2.8.17",
"@types/eslint\_\_js": "^8.42.3",
"@types/express": "^5.0.0",
"@types/node": "^22.9.1",
"eslint": "^9.15.0",
"globals": "^15.12.0",
"prettier": "^3.3.3",
"typescript": "^5.6.3",
"typescript-eslint": "^8.15.0"
}
