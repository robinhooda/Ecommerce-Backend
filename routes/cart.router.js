const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const {
  getAllCarts,
  getCartById,
  addNewCart,
  updateCartById,
  deleteCartById,
} = require('../controllers/cart.controller')

router
    .route('/')
    .get(getAllCarts)
    .post(addNewCart)

router.param('cartId', async (req, res, next, cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products')
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: 'error getting cart' })
    }
    req.cart = cart
    next()
  } catch {
    res
      .status(400)
      .json({ success: false, message: 'error while retriving the cart' })
  }
})

router
  .route('/:cartId')
  .get(getCartById)
  .post(updateCartById)
  .delete(deleteCartById)

module.exports = router
