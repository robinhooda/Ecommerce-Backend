const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { extend } = require('lodash')
const {
  getAllProducts,
  getProductById,
  updateProducts,
  updateproductById,
  deleteProductById,
} = require('../controllers/product.controller')

router
  .route('/')
  .get(getAllProducts)
  .post(updateProducts)

router
  .param('productId', async (req, res, next, productId) => {
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
  .get(getProductById)
  .post(updateproductById)
  .delete(deleteProductById)

module.exports = router
