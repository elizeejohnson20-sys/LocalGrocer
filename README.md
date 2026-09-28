# LocalGrocer

A responsive neighbourhood grocery ordering web application built with **React, Node.js, Express, and MongoDB**.

Customers can browse grocery products, search and filter products, manage their cart, register and log in, complete checkout, place orders, view order history, and receive order confirmation emails.

## Live Application

**Frontend:** https://local-grocer.vercel.app

**Backend API:** https://localgrocer-api.onrender.com

**Database:** MongoDB Atlas

## Features

* Responsive grocery shopping interface
* Product search with debounce
* Category-based product filtering
* Shop-by-category navigation
* Product-specific images
* Add, remove, and update cart quantities
* Cart persistence using `localStorage`
* User registration and login
* JWT authentication
* Password hashing with `bcryptjs`
* Protected routes
* Role-based access control
* Checkout form with validation
* Server-side order validation
* MongoDB order persistence
* Order confirmation page
* My Orders history
* Order confirmation email using Nodemailer
* Mobile-responsive design
* Error and empty states

> Payment gateway integration is outside the scope of this project.

## Technology Stack

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
* REST API
* JWT
* bcryptjs
* Nodemailer

### Testing & Tools

* Node.js Test Runner
* Supertest
* Postman
* Git
* GitHub
* VS Code

### Deployment

* **Vercel** — Frontend
* **Render** — Backend
* **MongoDB Atlas** — Database
* **Mailtrap** — Email testing

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
│   │   ├── categories/
│   │   └── hero-groceries.jpg
│   │
│   ├── components/
│   │   ├── FeaturedProducts.jsx
│   │   ├── NavbarComponent.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyOrders.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── Products.jsx
│   │   └── Register.jsx
│   │
│   ├── api.js
│   ├── CartContext.jsx
│   ├── app.jsx
│   ├── main.jsx
│   └── style.css
│
├── public/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js
```

## Product Categories

The current catalogue contains:

1. Fruits & Vegetables
2. Dairy & Eggs
3. Grains & Staples
4. Snacks & Beverages
5. Household
6. Personal Care

There are **30 active products** in the current customer catalogue.

## Application Flow

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
Validation
      ↓
Create Order
      ↓
MongoDB Atlas
      ↓
Order Confirmation
      ↓
Email Confirmation
```

## API Endpoints

### Products

```text
GET  /api/products
POST /api/products
```

Examples:

```text
GET /api/products?search=milk

GET /api/products?category=Dairy%20%26%20Eggs
```

Product creation is protected for admin users.

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

Order routes require JWT authentication.

## Local Setup

### Prerequisites

* Node.js
* npm
* MongoDB Community Server
* Git

### Clone the repository

```bash
git clone https://github.com/elizeejohnson20-sys/LocalGrocer.git
cd LocalGrocer
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Configure environment variables

Create the required environment files using:

```text
.env.example
backend/.env.example
```

Never commit real credentials or `.env` files.

### Seed products

From the `backend` directory:

```bash
node seedProducts.js
```

### Start the backend

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

Production:

```env
VITE_API_URL=https://localgrocer-api.onrender.com
```

### Backend

The backend uses:

```text
PORT
MONGODB_URI
JWT_SECRET
MAILTRAP_HOST
MAILTRAP_PORT
MAILTRAP_USER
MAILTRAP_PASS
MAIL_FROM
CLIENT_URL
```

Production secrets are configured through Render environment variables and are not stored in GitHub.

## Security

The application includes:

* JWT authentication
* Password hashing with bcryptjs
* Protected routes
* Role-based access control
* Admin-protected product creation
* Server-side checkout validation
* Active-product validation
* Server-side product pricing
* CORS restrictions
* Environment variables for secrets
* HTML escaping in email content

## Testing

Backend tests can be run from the `backend` directory:

```bash
npm test
```

Current automated coverage includes:

* `GET /api/products`
* Admin-authorized `POST /api/products`

The application was also tested manually for:

* Registration and login
* Product search
* Category filtering
* Cart persistence
* Checkout validation
* Order creation
* Order confirmation
* Order history
* Confirmation email
* Responsive layouts

## Deployment

### Frontend — Vercel

```text
https://local-grocer.vercel.app
```

The Vercel deployment uses the Vite frontend from the repository root.

### Backend — Render

```text
https://localgrocer-api.onrender.com
```

The Render service uses the `backend` directory as its root directory.

### Database — MongoDB Atlas

The LocalGrocer database is hosted on MongoDB Atlas.

The existing local database was migrated to Atlas while preserving:

```text
products
users
orders
```

## Deployment Architecture

```text
GitHub
  │
  ├── Vercel
  │     └── React + Vite Frontend
  │
  └── Render
        └── Node.js + Express Backend
                  │
                  ▼
             MongoDB Atlas
                  │
                  ▼
            Nodemailer / SMTP
```

## Project Status

* Frontend deployed
* Backend deployed
* MongoDB Atlas connected
* REST API integrated
* Authentication implemented
* Cart persistence implemented
* Checkout and order flow implemented
* Email confirmation implemented
* Backend tests implemented
* Responsive interface implemented

## Internship Project

LocalGrocer was developed as part of a **Full Stack Development internship project at Cynaris Solutions Pvt Ltd**.

The project follows the LocalGrocer application brief and demonstrates frontend development, REST API integration, authentication, database persistence, email integration, testing, and cloud deployment.
