const express = require('express')
const router = express.Router()
const {
  getCart,
  getCartById,
  updateCart,
  updateCartById,
  deleteCartById,
} = require('../controllers/cart.controller')
const { cartParamHandler } = require('../controllers/paramHandlers.controller')

router.route('/').get(getCart).post(updateCart)

router.param('cartId', cartParamHandler)

router
  .route('/:cartId')
  .get(getCartById)
  .post(updateCartById)
  .delete(deleteCartById)

module.exports = router
