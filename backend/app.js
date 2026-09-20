const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

const allowedOrigins = (
  process.env.CLIENT_URL ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests such as Postman/Supertest that have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(
        new Error('Not allowed by CORS')
      )
    },
  })
)
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'LocalGrocer API is running',
  })
})

module.exports = app