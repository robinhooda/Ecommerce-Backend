const express = require('express')
const router = express.Router()
const { addNewUser } = require('../controllers/auth.controller')
const bcrypt = require('bcrypt')

router.route('/').post(async (req, res) => {
  //hash passwords
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    addNewUser(req, res, hashPassword)
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'error while encrypting password',
      error: err.message,
    })
  }
})

module.exports = router
