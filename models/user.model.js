// const mongoose = require('mongoose')

// const { Schema } = mongoose

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter valid name to continue!',
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    required: 'Please enter valid email to continue!',
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: 'Please enter valid password to continue!',
    min: 6,
    max: 255,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
  ],
  wishList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'WishList',
    },
  ],
})

const User = model('User', userSchema)
module.exports = User

// to do-
// min vs minlength
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMzhmNTFlYzU1M2JlY2RmYTIzYTIiLCJleHBpcmUiOiIxMDAwIiwiaWF0IjoxNjIzNDA2ODkyfQ.9Gej_yC6dg4GnVhycMw6mg0bjuSN8UrXbHRwZ80oSTY
