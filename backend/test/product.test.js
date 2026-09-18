const { test, before, after, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const mongoose = require('mongoose')

const TEST_DATABASE =
  'mongodb://127.0.0.1:27017/localgrocer_test'

const app = require('../app')
const Product = require('../models/Product')

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
    category: 'Fruits',
    price: 100,
    unit: '1 kg',
    emoji: '🍎',
  })

  const response = await request(app)
    .get('/api/products')

  assert.equal(response.statusCode, 200)
  assert.equal(Array.isArray(response.body), true)
  assert.equal(response.body.length, 1)
  assert.equal(response.body[0].name, 'Test Apple')
})

test('POST /api/products should create a product', async () => {
  const newProduct = {
    name: 'Test Orange',
    category: 'Fruits',
    price: 80,
    unit: '1 kg',
    emoji: '🍊',
  }

  const response = await request(app)
    .post('/api/products')
    .send(newProduct)

  assert.equal(response.statusCode, 201)
  assert.equal(response.body.name, 'Test Orange')
  assert.equal(response.body.category, 'Fruits')

  const savedProduct = await Product.findOne({
    name: 'Test Orange',
  })

  assert.notEqual(savedProduct, null)
  assert.equal(savedProduct.price, 80)
})