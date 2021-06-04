const express = require('express')
const router = express.Router()
const {
  getAllCarts,
  getCartById,
  addNewCart,
  updateCartById,
  deleteCartById,
} = require('../controllers/cart.controller')
const { cartParamHandler } = require('../controllers/paramHandlers.controller')

router
    .route('/')
    .get(getAllCarts)
    .post(addNewCart)

router.param('cartId', cartParamHandler)

router
  .route('/:cartId')
  .get(getCartById)
  .post(updateCartById)
  .delete(deleteCartById)

module.exports = router
