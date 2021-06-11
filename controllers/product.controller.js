const Product = require('../models/product.model')
const { extend } = require('lodash')

const getAllProducts = async (req, res) => {
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
}

const getProductById = (req, res) => {
  const { product } = req
  res.json({ success: true, product })
}

const updateProducts = async (req, res) => {
  const product = new Product(req.body)
  try {
    const savedProduct = await product.save()
    res.json({ Product: savedProduct, success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const updateproductById = async (req, res) => {
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
}

const deleteProductById = async (req, res) => {
  let { product } = req

  await product.remove()
  product.deleted = true
  res.json({ success: true, product })
}

module.exports = {
  getAllProducts,
  getProductById,
  updateProducts,
  updateproductById,
  deleteProductById
}
