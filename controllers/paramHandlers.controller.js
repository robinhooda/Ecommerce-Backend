const Cart = require('../models/cart.model')
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const WishList = require('../models/wishList.model')

const cartParamHandler = async (req, res, next, cartId) => {
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
}

const categoryParamHandler = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId).populate('products')

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: 'error getting category' })
    }
    req.category = category
    next()
  } catch {
    res
      .status(400)
      .json({ success: false, message: 'error while retriving the category' })
  }
}

const productParamHandler = async (req, res, next, productId) => {
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
}

const wishListParamHandler = async (req, res, next, wishListId) => {
  try {
    const wishList = await WishList.findById(wishListId)

    if (!wishList) {
      return res
        .status(400)
        .json({ success: false, message: 'error getting wishList' })
    }
    req.wishList = wishList
    next()
  } catch {
    res
      .status(400)
      .json({ success: false, message: 'error while retriving the wishList' })
  }
}


module.exports = {
  cartParamHandler,
  categoryParamHandler,
  productParamHandler,
  wishListParamHandler,
}
