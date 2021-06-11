const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  const token = req.header('auth-token')

  // if auth token not found
  if (!token)
    return res.status(401).json({ success: false, message: 'Access Denied!' })

  // verify auth token

  try {
    const verified = jwt.verify(token, process.env.MY_TOKEN_SECRET)
    res.user = verified
    next()
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Token!' })
  }
}

module.exports = { auth }
