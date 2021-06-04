const express = require('express')
const router = express.Router()
const WishList = require('../models/WishList')
const { extend } = require('lodash')

router
  .route('/')
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
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
  })

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
  .get((req, res) => {
    const { wishList } = req

    res.json({ success: true, wishList })
  })

  .post(async (req, res) => {
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
  })

  .delete(async (req, res) => {
    let { wishList } = req

    await wishList.remove()
    wishList.deleted = true
    res.json({ success: true, wishList })
  })

module.exports = router
