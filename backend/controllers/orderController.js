const Order = require('../models/Order')
const Product = require('../models/Product')

async function createOrder(req, res) {
  try {
    const { items, deliveryAddress } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'Order must contain at least one product',
      })
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        message: 'Delivery address is required',
      })
    }

    const productIds = items.map((item) => item.productId)

    const products = await Product.find({
      _id: { $in: productIds },
    })

    if (products.length !== items.length) {
      return res.status(400).json({
        message: 'One or more products were not found',
      })
    }

    const orderItems = items.map((item) => {
      const product = products.find(
        (product) => product._id.toString() === item.productId
      )

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit,
      }
    })

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
    })

    res.status(201).json({
      message: 'Order created successfully',
      order,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create order',
      error: error.message,
    })
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    })
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message,
    })
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
}