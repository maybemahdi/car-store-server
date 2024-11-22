# Car Store B4A2V3

## Objective

### Develop an Express application using TypeScript and MongoDB, with Mongoose for schema validation and database management. The application manages Cars and Orders with full CRUD capabilities and ensures data integrity.

## Features

### Car Management

```
* Add, update, delete, and retrieve cars.
* Filter cars by category, brand, or model using query parameters.
* Manage car inventory and track availability.
```

### Order Management

```
* Place car orders by specifying customer email and car ID.
* Automatically adjust inventory and track stock availability.
* Calculate revenue using MongoDB aggregation.
```

### Error Handling

```
* Standardized error response with detailed validation messages.
* Handle scenarios like insufficient stock or invalid input gracefully.
```

### Data Validation

```
* Mongoose schema validation ensures proper structure for both cars and orders.
* Enum-based category restriction for cars.
```

### Revenue Calculation

```
* Aggregate and calculate total revenue from all orders.
```

## Models

### Car Model

```
* brand: Manufacturer of the car (e.g., Toyota).
* model: Specific car model (e.g., Camry).
* year: Manufacture year.
* price: Cost of the car.
* category: Enum (Sedan, SUV, Truck, Coupe, Convertible).
* description: Brief details about the car.
* quantity: Available stock.
* inStock: Boolean indicating availability.
```

### Order Model

````
* email: Customer email address.
* car: ObjectId referencing the car.
* quantity: Number of units ordered.
* totalPrice: Calculated as ```price × quantity```
````

## Setup Instructions

## Prerequisites

```
* Node.js (version 18 or higher)
* MongoDB Community Server
* TypeScript installed globally (npm install -g typescript)
```

## Steps to Run Locally

### Clone the Repository

```bash
git clone https://github.com/maybemahdi/car-store-server
cd car-store-server
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

- Create a .env file in the root directory.
- Add the following:

```dotenv
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
```

### Compile TypeScript

```bash
npm run dev || tsc || npx tsx
```

### Start the Server

```bash
npm run dev
```

### Test the API

#### Use tools like Postman or cURL to interact with the endpoints:

- `/api/cars` for managing cars.

- `/api/orders` for placing orders.

## API Endpoints

### Car Management

- Create Car

```
POST /api/cars

Request body: { brand, model, year, price, category, description, quantity, inStock }
```

- Retrieve All Cars

```
GET /api/cars?searchTerm=category|brand|model
```

- Retrieve Specific Car

```
GET /api/cars/:carId
```

- Update Car

```
PUT /api/cars/:carId

Request body: { fields to update }
```

- Delete Car

```
DELETE /api/cars/:carId
```

### Order Management

- Place Order

```
POST /api/orders

Request body: { email, car, quantity, totalPrice }
```

- Calculate Revenue

```
GET /api/orders/revenue
```

## Scripts
```bash
Build: npm run build
Start: npm start
Development: npm run dev
```


## Thank You for visiting! Have a Good Day💕