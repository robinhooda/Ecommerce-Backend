const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductById,
  updateProducts,
  updateproductById,
  deleteProductById,
} = require('../controllers/product.controller')
const {
  productParamHandler,
} = require('../controllers/paramHandlers.controller')

router
  .route('/')
  .get(getAllProducts)
  .post(updateProducts)

router.param('productId', productParamHandler)

router
  .route('/:productId')
  .get(getProductById)
  .post(updateproductById)
  .delete(deleteProductById)

module.exports = router
