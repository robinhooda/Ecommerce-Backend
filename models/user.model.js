const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please enter valid first name to continue!',
    minlength: 3,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: 'Please enter valid last name to continue!',
    minlength: 3,
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
})

const User = model('User', userSchema)
module.exports = User
