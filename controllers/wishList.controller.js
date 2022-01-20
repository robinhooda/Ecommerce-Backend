const WishList = require('../models/wishList.model')
const { extend } = require('lodash')

const getAllWishLists = async (req, res) => {
  try {
    const userId = req.user._id
    const wishList = await WishList.findOne({ _id: userId }).populate(
      'wishlistItems'
    )
    res.json({ success: true, wishList })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'unable to get wishLists',
      errorMessage: err.message,
    })
  }
}

const updateWishList = async (req, res) => {
  const updatedWishlistArr = req.body
  console.log(updatedWishlistArr)
  try {
    const userId = req.user._id
    let wishList = await WishList.findOne({ _id: userId })
    wishList.wishlistItems = updatedWishlistArr
    console.log({ wishList })

    const savedWishList = await wishList.save()
    res.json({ WishList: savedWishList, success: true })
  } catch (err) {
    res.json({
      success: false,
      message: 'error while adding wishList',
      error: err.message,
    })
  }
}

const getWishListById = (req, res) => {
  const { wishList } = req

  res.json({ success: true, wishList })
}

const updateWishListById = async (req, res) => {
  const updatedWishList = req.body
  let { wishList } = req
  try {
    wishList.wishlistItems = [
      ...wishList.wishlistItems,
      ...updatedWishList.wishlistItems,
    ]

    wishList = await wishList.save()
    res.json({ success: true, wishList: wishList })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error while updating wishList',
      error: err.message,
    })
  }
}

const deleteWishListById = async (req, res) => {
  let { wishList } = req

  await wishList.remove()
  wishList.deleted = true
  res.json({ success: true, wishList })
}

module.exports = {
  getAllWishLists,
  updateWishList,
  getWishListById,
  updateWishListById,
  deleteWishListById,
}
