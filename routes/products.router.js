const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { extend } = require('lodash')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const products = await Product.find()
      res.json({ success: true, products })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'unable to get products',
        errorMessage: err.message,
      })
    }
  })
  .post(async (req, res) => {
    const product = new Product(req.body)
    try {
      const savedProduct = await product.save()
      res.json({ Product: savedProduct, success: true })
    } catch (err) {
      res.json({ success: false, message: err.message })
    }
  })

router.param('productId', async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId)

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: 'error getting product' })
    }
    req.product = product
    next()
  } catch {
    res
      .status(400)
      .json({ success: false, message: 'error while retriving the product' })
  }
})

router
  .route('/:productId')
  .get((req, res) => {
    const { product } = req
    res.json({ success: true, product })
  })
  
  .post(async (req, res) => {
    const updatedProduct = req.body
    let { product } = req

    try {
      product = extend(product, updatedProduct)
      product = await product.save()
      res.json({ success: true, product: product })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'error while updating product',
        error: err.message,
      })
    }
  })

  .delete(async (req, res) => {
    let { product } = req

    await product.remove()
    product.deleted = true
    res.json({ success: true, product })
  })

module.exports = router
