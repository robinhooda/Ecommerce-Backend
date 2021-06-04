const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const { extend } = require('lodash')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const cart = await Cart.find()
        .populate('products')
        .select('_id products name')
      res.json({ success: true, cart })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'unable to get cart',
        errorMessage: err.message,
      })
    }
  })
  .post(async (req, res) => {
    const cart = new Cart(req.body)
    try {
      const savedCart = await cart.save()

      res.json({ Cart: savedCart, success: true })
    } catch (err) {
      res.json({ success: false, message: err.message })
    }
  })

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
  .get((req, res) => {
    const { cart } = req
    res.json({ success: true, cart })
  })

  .post(async (req, res) => {
    const updatedCart = req.body
    let { cart } = req

    try {
      cart.products = [...cart.products, ...updatedCart.products]
      cart = await cart.save()
      res.json({ success: true, cart: cart })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'error while updating cart',
        error: err.message,
      })
    }
  })

  .delete(async (req, res) => {
    let { cart } = req

    await cart.remove()
    cart.deleted = true
    res.json({ success: true, product })
  })

module.exports = router
