# Car Store B4A2V3

## Models:

## Car Model

brand (string): The brand or manufacturer of the car (e.g., Toyota, BMW, Ford).
model (string): The model of the car (e.g., Camry, 3 Series, Focus).
year (number): The year of manufacture.
price (number): Price of the car.
category (string): The type of car (e.g., Sedan, SUV, Truck). use enum, exact value (Sedan, SUV, Truck, Coupe, Convertible)
description (string): A brief description of the car's features.
quantity (number): Quantity of the car available.
inStock (boolean): Indicates if the car is in stock.

## Order Model

email (string): The email address of the customer.
car (ObjectId): The car ordered. (unused ref) (enter the created carId from your database which car you would love to buy).
quantity (number): The quantity of the ordered car.
totalPrice (number): The total price (car price * quantity).
