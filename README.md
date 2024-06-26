# Car Rental Reservation System Backend

Welcome to the Car Rental Reservation System Backend repository! This project implements a backend for a car rental service, featuring CRUD operations, authentication, authorization, and more.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Models](#models)
- [API Endpoints](#api-endpoints)
  - [1. Sign Up](#1-sign-up)
  - [2. Sign In](#2-sign-in)
  - [3. Create a Car](#3-create-a-car)
  - [4. Get All Cars](#4-get-all-cars)
  - [5. Get A Car](#5-get-a-car)
  - [6. Update A Car](#6-update-a-car)
  - [7. Delete A Car](#7-delete-a-car)
  - [8. Get All Bookings](#8-get-all-bookings)
  - [9. Book a Car](#9-book-a-car)
  - [10. Get User's Bookings](#10-get-users-bookings)
  - [11. Return The Car](#11-return-the-car)
- [Hints for totalCost Calculation](#hints-for-totalcost-calculation)
- [Bonus Part](#bonus-part)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Admin Actions:**
  - Car Management: Create, update, and soft delete car entries.
  - Booking Oversight: View all bookings and calculate ride costs.
- **User Actions:**
  - Book a Ride: Select a car and book it.
  - Rental History: View booking history.

## Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose for ODM and validation)

## Models

### User Model

- **name**: String
- **email**: String
- **role**: String (user or admin)
- **password**: String
- **phone**: String
- **address**: String

### Car Model

- **name**: String
- **description**: String
- **color**: String
- **isElectric**: Boolean
- **status**: String (default: 'available')
- **features**: Array of Strings
- **pricePerHour**: Number
- **isDeleted**: Boolean (default: false)

### Booking Model

- **date**: Date
- **user**: Reference to User Model
- **car**: Reference to Car Model
- **startTime**: String (24hr format)
- **endTime**: String (24hr format)
- **totalCost**: Number (default: 0)

## API Endpoints

### 1. Sign Up

- **Route:** `/api/auth/signup` (POST)
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St, City, Country"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": { ... }
  }
  ```

### 2. Sign In

- **Route:** `/api/auth/signin` (POST)
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": { ... },
    "token": "your JWT token"
  }
  ```

### 3. Create a Car

- **Route:** `/api/cars` (POST, Admin only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Request Body:**
  ```json
  {
    "name": "Tesla Model 3",
    "description": "An electric car with advanced technology and performance.",
    "color": "White",
    "isElectric": true,
    "features": ["AC", "Bluetooth", "Long Range Battery"],
    "pricePerHour": 500
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Car created successfully",
    "data": { ... }
  }
  ```

### 4. Get All Cars

- **Route:** `/api/cars` (GET)
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Cars retrieved successfully",
    "data": [ ... ]
  }
  ```

### 5. Get A Car

- **Route:** `/api/cars/:id` (GET)
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "A Car retrieved successfully",
    "data": { ... }
  }
  ```

### 6. Update A Car

- **Route:** `/api/cars/:id` (PUT, Admin only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Request Body:**
  ```json
  {
    "color": "Black",
    // All other fields as needed
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Car updated successfully",
    "data": { ... }
  }
  ```

### 7. Delete A Car

- **Route:** `/api/cars/:id` (DELETE, Admin only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Car Deleted successfully",
    "data": { ... }
  }
  ```

### 8. Get All Bookings

- **Route:** `/api/bookings` (GET, Admin only)
- **Query Parameters:**
  - `carId`: ID of the car
  - `date`: Specific date (YYYY-MM-DD)
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings retrieved successfully",
    "data": [ ... ]
  }
  ```

### 9. Book a Car

- **Route:** `/api/bookings` (POST, User only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Request Body:**
  ```json
  {
    "carId": "60d9c4e4f3b4b544b8b8d1c7",
    "date": "2024-06-15",
    "startTime": "13:00"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Car booked successfully",
    "data": { ... }
  }
  ```

### 10. Get User's Bookings

- **Route:** `/api/bookings/my-bookings` (GET, User only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "My Bookings retrieved successfully",
    "data": [ ... ]
  }
  ```

### 11. Return The Car

- **Route:** `/api/cars/return` (PUT, Admin only)
- **Request Headers:**
  ```
  Authorization: Bearer your JWT token
  ```
- **Request Body:**
  ```json
  {
    "bookingId": "60d9c4e4f3b4b544b8b8d1c7",
    "endTime": "15:00"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Car returned successfully",
    "data": { ... }
  }
  ```

## Hints for `totalCost` Calculation

1. **Convert Times to Hours:** Convert `startTime` and `endTime` to hours.
2. **Calculate Duration:** Subtract `startTime` from `endTime` to find the total duration in hours.
3. **Multiply by Price per Hour:** Multiply the duration by `pricePerHour` to get the total cost.

## Bonus Part

### 1. No Data Found

When no matching data is found, return:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
```

### 2. Error Handling

Implement proper error handling throughout the application. Use global error handling middleware to catch and handle errors, providing appropriate error responses with status codes and error messages.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Car-Rental-Server.git
   cd car

-rental-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

1. Use an API client like Postman to interact with the endpoints.
2. Ensure you have the required headers and body data for each request.
3. Refer to the [API Endpoints](#api-endpoints) section for detailed information on each route.

---

This README provides a comprehensive overview of the Car Rental Reservation System Backend, including its features, models, API endpoints, installation, and usage instructions. Feel free to contribute and raise issues on GitHub!
