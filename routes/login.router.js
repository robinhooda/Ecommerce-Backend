const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/').post(async (req, res) => {
  // login - email , password

  // check if email exists and return user details
  const user = await User.findOne({ email: req.body.email })

  // return error if user not exists
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: 'Email doesnt exist!' })

  // if user exists, check password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res
      .status(400)
      .json({ success: false, message: 'Password is wrong!' })
  }

  // create and assign token
  const token = jwt.sign(
    {
      _id: user._id,
      expire: '1000',
    },
    process.env.MY_TOKEN_SECRET
  )

  return res
    .header('auth-token', token)
    .status(200)
    .json({ success: true, message: 'You are logged in!', token })
})

module.exports = router
