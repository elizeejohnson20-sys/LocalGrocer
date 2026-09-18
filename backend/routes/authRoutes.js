const express = require('express')
const {
  register,
  login,
} = require('../controllers/authController')
const {
  protect,
  authorize,
} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Protected profile accessed successfully',
    user: req.user,
  })
})

router.get(
  '/admin',
  protect,
  authorize('admin'),
  (req, res) => {
    res.json({
      message: 'Admin area accessed successfully',
      user: req.user,
    })
  }
)

module.exports = router