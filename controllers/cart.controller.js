const { findOne, findById } = require('../models/cart.model')
const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const { extend } = require('lodash')
// const getAllCarts = async (req, res) => {
//   try {
//     const cart = await Cart.find()
//       .populate('products')
//       .select('_id products name')
//     res.json({ success: true, cart })
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'unable to get cart',
//       errorMessage: err.message,
//     })
//   }
// }
const getCart = async (req, res) => {
  try {
    const userId = req.user._id
    console.log({ userId })
    const cart = await Cart.findOne({ _id: userId }).populate(
      'cartItems.product'
    )
    console.log({ cart })
    res.json({ success: true, cart })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'unable to get cart',
      errorMessage: err.message,
    })
  }
}

// const addNewCart = async (req, res) => {
//   const cart = new Cart(req.body)
//   try {
//     const savedCart = await cart.save()

//     res.json({ Cart: savedCart, success: true })
//   } catch (err) {
//     res.json({ success: false, message: err.message })
//   }
// }

// const addNewCart = async (req, res) => {
//   const cart = new Cart(req.body)

//   try {
//     //create new cart with data
//     const savedCart = await cart.save()

//     // find user and set newcartId
//     const userId = req.user._id
//     const user = await User.findById(userId)
//     user.cart.push(savedCart._id)

//     //save changed user data
//     const savedUser = await user.save()

//     res.json({ cart: savedCart, user: savedUser, success: true })
//   } catch (err) {
//     res.json({ success: false, message: err.message })
//   }
// }

const updateCart = async (req, res) => {
  const updatedCart = req.body

  try {
    const userId = req.user._id
    let cart = await Cart.findOne({ _id: userId })
    cart.cartItems = updatedCart
    console.log({cart})

    const savedCart = cart.save()
    console.log(savedCart)
    res.status(200).json({ cart: savedCart, success: true })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

// to be removed
const getCartById = (req, res) => {
  const { cart } = req
  res.json({ success: true, cart })
}

// const updateCartById = async (req, res) => {
//   const updatedCart = req.body
//   let { cart } = req

//   try {
//     cart.products = [...cart.products, ...updatedCart.products]
//     cart = await cart.save()
//     res.json({ success: true, cart: cart })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: 'error while updating cart',
//       error: err.message,
//     })
//   }
// }

const updateCartById = async (req, res) => {
  const updatedCart = req.body

  try {
    const user = await findById(req.user._id)
    const cart = await findById(user.cart[0]).populate('products')

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
}

const updateCardItems = async (req, res) => {
  const updatedCart = req.body

  try {
    const user = await User.findById(req.user._id)
    if (user.cart.length === 0) {
      // to do-
      // make addNewCartToUser func
      // addNewCartToUser(req,res,user)
      const cart = new Cart(updatedCart)
      const savedCart = await cart.save()
      user.cart.push(savedCart._id)
      const savedUser = await user.save()
      res.json({ cart: savedCart, user: savedUser, success: true })
    }
    const cart = await Cart.findById(user.cart[0])
    cart.products = [...cart.products, ...updatedCart.products]
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error while updating cart',
      error: err.message,
    })
  }
}

const deleteCartById = async (req, res) => {
  let { cart } = req

  await cart.remove()
  cart.deleted = true
  res.json({ success: true, product })
}

module.exports = {
  getCart,
  getCartById,
  updateCart,
  updateCartById,
  deleteCartById,
}

