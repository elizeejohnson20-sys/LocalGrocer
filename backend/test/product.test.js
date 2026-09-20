require('dotenv').config()
const { test, before, after, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const TEST_DATABASE =
  'mongodb://127.0.0.1:27017/localgrocer_test'

const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')

before(async () => {
  await mongoose.connect(TEST_DATABASE)
})

afterEach(async () => {
  await Product.deleteMany({})
})

after(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

test('GET /api/products should return products', async () => {
  await Product.create({
    name: 'Test Apple',
    category: 'Fruits & Vegetables',
    price: 100,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
  })

  const response = await request(app)
    .get('/api/products')

  assert.equal(response.statusCode, 200)
  assert.equal(Array.isArray(response.body), true)
  assert.equal(response.body.length, 1)
  assert.equal(response.body[0].name, 'Test Apple')
})

test('POST /api/products should create a product', async () => {
 const hashedPassword = await bcrypt.hash(
  'password123',
  10
)

await User.create({
  name: 'Test Admin',
  email: 'testadmin@localgrocer.com',
  password: hashedPassword,
  role: 'admin',
})
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'testadmin@localgrocer.com',
      password: 'password123',
    })

  assert.equal(loginResponse.statusCode, 200)

  const token = loginResponse.body.token

  const newProduct = {
    name: 'Test Orange',
    category: 'Fruits & Vegetables',
    price: 80,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=600&q=80',
  }

  const response = await request(app)
    .post('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .send(newProduct)

  assert.equal(response.statusCode, 201)
  assert.equal(response.body.name, 'Test Orange')
  assert.equal(
    response.body.category,
    'Fruits & Vegetables'
  )

  const savedProduct = await Product.findOne({
    name: 'Test Orange',
  })

  assert.notEqual(savedProduct, null)
  assert.equal(savedProduct.price, 80)
})