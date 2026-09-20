const express = require('express')

const {
  getProducts,
  createProduct,
} = require('../controllers/productController')

const {
  protect,
  authorize,
} = require('../middleware/authMiddleware')

const router = express.Router()

router.get(
  '/',
  getProducts
)

router.post(
  '/',
  protect,
  authorize('admin'),
  createProduct
)

module.exports = router