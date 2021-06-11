const Category = require('../models/category.model')
const { extend } = require('lodash')

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('products')
    res.json({ success: true, categories })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'unable to get categories',
      errorMessage: err.message,
    })
  }
}

const addNewCategory = async (req, res) => {
  const category = new Category(req.body)
  try {
    const savedCategory = await category.save()
    res.json({ Category: savedCategory, success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const getCategoryById = async (req, res) => {
  const { category } = req

  category.__v = undefined
  res.json({ success: true, category })
}

const updateCategoryById = async (req, res) => {
  const updatedCategory = req.body
  let { category } = req
  try {
    if (updatedCategory.name) {
      category.name = updatedCategory.name
    }
    category.products = [...category.products, ...updateCategoryById.products]
    category = await category.save()
    res.json({ success: true, category: category })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error while updating category',
      error: err.message,
    })
  }
}

const deleteCategoryById = async (req, res) => {
  let { category } = req

  await category.remove()
  category.deleted = true
  res.json({ success: true, category })
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
}
