const express = require('express')
const router = express.Router()
const WishList = require('../models/WishList')
const { extend } = require('lodash')
const {
  getAllWishLists,
  addNewWishList,
  getWishListById,
  updateWishListById,
  deleteWishListById,
} = require('../controllers/wishList.controller')

router
    .route('/')
    .get(getAllWishLists)
    .post(addNewWishList)

router.param('wishListId', async (req, res, next, wishListId) => {
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
})

router
  .route('/:wishListId')
  .get(getWishListById)
  .post(updateWishListById)
  .delete(deleteWishListById)

module.exports = router
