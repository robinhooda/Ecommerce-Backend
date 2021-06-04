const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/category.controller')

router
    .route('/')
    .get(getAllCategories)
    .post(addNewCategory)

router.param('categoryId', async (req, res, next, categoryId) => {
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
})

router
  .route('/:categoryId')
  .get(getCategoryById)
  .post(updateCategoryById)
  .delete(deleteCategoryById)

module.exports = router
