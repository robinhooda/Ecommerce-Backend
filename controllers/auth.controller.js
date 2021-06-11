const User = require("../models/user.model")

const addNewUser = async (req,res,hashPassword) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    cart: [],
    wishList: []
  })

  try {
    const savedUser = await user.save()
    res.status(201).json({ success: true, user: savedUser })
  } catch (err) {
    res.status(400).json({
      success: false, message: "error while registering a new user",
      error: err.message
    })
  }
}

module.exports = { addNewUser }
