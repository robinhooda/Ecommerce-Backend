const Cart = require('../models/Cart')

const getAllCarts = async (req, res) => {
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
}

const addNewCart = async (req, res) => {
  const cart = new Cart(req.body)
  try {
    const savedCart = await cart.save()

    res.json({ Cart: savedCart, success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const getCartById = (req, res) => {
  const { cart } = req
  res.json({ success: true, cart })
}

const updateCartById = async (req, res) => {
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
}

const deleteCartById = async (req, res) => {
  let { cart } = req

  await cart.remove()
  cart.deleted = true
  res.json({ success: true, product })
}

module.exports = {
  getAllCarts,
  getCartById,
  addNewCart,
  updateCartById,
  deleteCartById,
}
