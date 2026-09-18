# LocalGrocer

LocalGrocer is a responsive neighbourhood grocery ordering web application built with React and Node.js.

The application allows users to browse grocery products, search and filter products, manage their cart, authenticate securely, and place grocery orders with delivery details.

## Features

- Product listing
- Product search and category filtering
- Shopping cart management
- Cart quantity controls
- Cart persistence using localStorage
- User registration and login
- JWT-based authentication
- Role-based access control
- Protected API routes
- Grocery order creation
- Order history
- Delivery address handling
- MongoDB database persistence
- REST API
- Automated API tests
- Responsive user interface

## Tech Stack

### Frontend
- React
- React Router
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- REST API

### Development Tools
- VS Code
- Git
- GitHub
- Postman
- Node.js Test Runner

## Project Structure

```text
LocalGrocer/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── test/
│   │   └── product.test.js
│   │
│   ├── .env.example
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── frontend/