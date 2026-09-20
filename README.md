# LocalGrocer

LocalGrocer is a responsive neighbourhood grocery ordering web application built with React and Node.js.

It allows customers to browse grocery products, search and filter products, manage a persistent shopping cart, register and log in securely, complete checkout, place orders, view order history, and receive order confirmation emails.

## Features

* Product listing with real product images
* Product search with debounce
* Category filtering
* Shop-by-category navigation
* Shopping cart with quantity controls
* Cart persistence using localStorage
* User registration and login
* JWT-based authentication
* Password hashing with bcryptjs
* Role-based access control
* Admin-protected product creation
* Protected order APIs
* Order creation with MongoDB persistence
* Server-side checkout validation
* Order history
* Delivery address handling
* Order confirmation page
* Order confirmation email using Nodemailer and Mailtrap SMTP
* Responsive mobile-friendly interface
* Automated API tests

## Tech Stack

### Frontend

* React
* React Router
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer
* REST API

### Testing and Development

* Node.js Test Runner
* Supertest
* Postman
* Git
* GitHub
* VS Code

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
│   ├── utils/
│   │   └── email.js
│   │
│   ├── .env.example
│   ├── app.js
│   ├── seedProducts.js
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── CartContext.jsx
│   ├── app.jsx
│   ├── main.jsx
│   └── style.css
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/elizeejohnson20-sys/LocalGrocer.git
cd LocalGrocer
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create:

```text
backend/.env
```

Use `backend/.env.example` as the template.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/localgrocer
JWT_SECRET=your_jwt_secret_here
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
MAIL_FROM=LocalGrocer <hello@localgrocer.test>
CLIENT_URL=http://localhost:5173
```

Do not commit the real `.env` file.

### 5. Start MongoDB

Make sure MongoDB is running locally.

### 6. Seed the product catalogue

From the `backend` directory:

```bash
node seedProducts.js
```

The seed creates or updates the LocalGrocer product catalogue.

### 7. Start the backend

From `backend`:

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

### 8. Start the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## API Endpoints

### Products

```text
GET  /api/products
POST /api/products
```

`GET /api/products` supports:

```text
?search=
?category=
```

Product creation requires an authenticated admin user.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
GET  /api/auth/admin
```

### Orders

```text
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

Order endpoints require JWT authentication.

## Security

The backend includes:

* JWT authentication
* bcryptjs password hashing
* Role-based access control
* Protected product creation
* Protected order routes
* Server-side order validation
* Active-product checks before order creation
* Environment variables for secrets
* CORS origin restrictions
* HTML escaping in confirmation emails

## Testing

Backend API tests use the Node.js built-in test runner and Supertest.

From the backend directory:

```bash
npm test
```

The current test suite covers:

* `GET /api/products`
* Admin-authorized `POST /api/products`

## Product Catalogue

The application currently contains six product categories:

* Fruits & Vegetables
* Dairy & Eggs
* Grains & Staples
* Snacks & Beverages
* Household
* Personal Care

The catalogue contains 30 active products for the current shop experience.

## Order Flow

```text
Browse Products
      ↓
Search / Filter
      ↓
Add to Cart
      ↓
Cart Persistence
      ↓
Login / Register
      ↓
Checkout
      ↓
Server-side Validation
      ↓
MongoDB Order
      ↓
Order Confirmation
      ↓
Email Confirmation via Mailtrap
```

## Current Project Status

* Frontend UI implemented
* Product search and filtering implemented
* Category navigation implemented
* Cart implemented with localStorage persistence
* Authentication implemented
* Backend REST APIs implemented
* MongoDB persistence implemented
* Order creation implemented
* Order history implemented
* Email confirmation implemented
* API tests passing
* Production frontend build verified

## Notes

This project is developed as part of a Full Stack Development internship project for Cynaris Solutions Pvt Ltd.

The application uses MongoDB according to the LocalGrocer project brief.
