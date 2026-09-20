const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

const {
  sendOrderConfirmationEmail,
} = require('../utils/email')

async function createOrder(req, res) {
  try {
    const {
      items,
      deliveryAddress,
    } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Order must contain at least one product',
      })
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        message: 'Delivery address is required',
      })
    }

    const {
      fullName,
      phone,
      address,
      city,
      pincode,
    } = deliveryAddress

    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !pincode?.trim()
    ) {
      return res.status(400).json({
        message: 'All delivery address fields are required',
      })
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      return res.status(400).json({
        message: 'Phone number must contain exactly 10 digits',
      })
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      return res.status(400).json({
        message: 'Pincode must contain exactly 6 digits',
      })
    }

    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({
          message: 'Each order item must contain a productId',
        })
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: 'Product quantity must be a positive integer',
        })
      }
    }

    const productIds = items.map(
      (item) => item.productId
    )
const products = await Product.find({
  _id: { $in: productIds },
  isActive: true,
})

    if (products.length !== items.length) {
      return res.status(400).json({
        message: 'One or more products were not found',
      })
    }

    const orderItems = items.map((item) => {
      const product = products.find(
        (product) =>
          product._id.toString() === item.productId
      )

      if (!product) {
        throw new Error(
          `Product not found: ${item.productId}`
        )
      }

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit,
      }
    })

    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
    })

    
    const user = await User.findById(
      req.user.id
    ).select('name email')

   

    let emailSent = false

    if (user) {
      try {
       

        await sendOrderConfirmationEmail({
          to: user.email,
          customerName: user.name,
          order,
        })

        emailSent = true

        
      } catch (emailError) {
        console.error(
          'ORDER EMAIL FAILED:',
          emailError.message
        )
      }
    }

    const response = {
      message: 'Order created successfully',
      order,
      emailSent,
    }

    

    return res.status(201).json(response)
  } catch (error) {
    console.error(
      'CREATE ORDER ERROR:',
      error.message
    )

    return res.status(400).json({
      message: 'Failed to create order',
      error: error.message,
    })
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    })

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