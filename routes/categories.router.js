const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const { extend } = require('lodash')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const categories = await Category.find()
        .populate('products', 'name price')
        .select('_id products name')
      res.json({ success: true, categories })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'unable to get categories',
        errorMessage: err.message,
      })
    }
  })
  .post(async (req, res) => {
    const category = new Category(req.body)
    try {
      const savedCategory = await category.save()
      res.json({ Category: savedCategory, success: true })
    } catch (err) {
      res.json({ success: false, message: err.message })
    }
  })

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
  .get((req, res) => {
    const { category } = req

    category.__v = undefined
    res.json({ success: true, category })
  })

  .post(async (req, res) => {
    const updatedCategory = req.body
    let { category } = req
    try {
      category = extend(category, updatedCategory)

      category = await category.save()
      res.json({ success: true, category: category })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'error while updating category',
        error: err.message,
      })
    }
  })

  .delete(async (req, res) => {
    let { category } = req

    await category.remove()
    category.deleted = true
    res.json({ success: true, category })
  })

module.exports = router
