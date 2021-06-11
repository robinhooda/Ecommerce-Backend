const WishList = require('../models/wishList.model')
const { extend } = require('lodash')

const getAllWishLists = async (req, res) => {
  try {
    const wishLists = await WishList.find()
      .populate('products', 'name price')
      .select('_id products name')
    res.json({ success: true, wishLists })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'unable to get wishLists',
      errorMessage: err.message,
    })
  }
}

const addNewWishList = async (req, res) => {
  const wishList = new WishList(req.body)
  try {
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
    wishList.products = [...wishList.products, ...updatedWishList.products]

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
  addNewWishList,
  getWishListById,
  updateWishListById,
  deleteWishListById,
}
