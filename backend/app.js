const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
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