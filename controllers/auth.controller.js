const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const WishList = require('../models/wishList.model')

const addNewUser = async (req, res, hashPassword) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
  })

  try {
    const savedUser = await user.save()
    const cart = new Cart({ _id: savedUser._id, cartItems: [] })
    const savedCart = await cart.save()
    const wishlist = new WishList({ _id: savedUser._id, wishlistItems: [] })
    const savedWishlist = await wishlist.save()
    res.status(201).json({
      success: true,
      user: savedUser,
      cart: savedCart,
      wishlist: savedWishlist,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error while registering a new user',
      error: err.message,
    })
  }
}

module.exports = { addNewUser }
