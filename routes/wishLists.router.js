const express = require('express')
const router = express.Router()
const {
  getAllWishLists,
  updateWishList,
  getWishListById,
  updateWishListById,
  deleteWishListById,
} = require('../controllers/wishList.controller')
const {
  wishListParamHandler,
} = require('../controllers/paramHandlers.controller')

router.route('/').get(getAllWishLists).post(updateWishList)

router.param('wishListId', wishListParamHandler)

router
  .route('/:wishListId')
  .get(getWishListById)
  .post(updateWishListById)
  .delete(deleteWishListById)

module.exports = router
