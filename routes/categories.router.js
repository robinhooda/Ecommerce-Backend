const express = require('express')
const router = express.Router()
const {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/category.controller')
const { categoryParamHandler } = require('../models/Category')

router
    .route('/')
    .get(getAllCategories)
    .post(addNewCategory)

router.param('categoryId', categoryParamHandler)

router
  .route('/:categoryId')
  .get(getCategoryById)
  .post(updateCategoryById)
  .delete(deleteCategoryById)

module.exports = router
