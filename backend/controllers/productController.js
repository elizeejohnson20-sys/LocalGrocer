const Product = require('../models/Product')

async function getProducts(req, res) {
  try {
    const { search, category } = req.query

    const filter = {}

    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i',
      }
    }

    if (category && category !== 'All') {
      filter.category = category
    }

    const products = await Product.find(filter)

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    })
  }
}

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body)

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create product',
      error: error.message,
    })
  }
}

module.exports = {
  getProducts,
  createProduct,
}