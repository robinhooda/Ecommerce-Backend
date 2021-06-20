const express = require('express')

const app = express()
const { initializeDB } = require('./db/db.connect')
require('dotenv').config()

const PORT = 3000

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome! API is working' })
})

// connection to DB
initializeDB()

app.listen(process.env.PORT || PORT, () => {
  console.log('Server started on port ', PORT)
})
