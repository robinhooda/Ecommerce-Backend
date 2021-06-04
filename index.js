const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { initializeDB } = require('./db/db.connect.js')
const {
  productsV1,
  categoriesV1,
  wishListsV1,
  cartV1,
} = require('./routes/index')

const { errorHandler, routeNotFound } = require('./middlewares/index')
const PORT = process.env.PORT || 3020

//connection to DB
initializeDB()

app.use(express.json())
app.use(cors())

app.use('/products', productsV1)
app.use('/categories', categoriesV1)
app.use('/wishLists', wishListsV1)
app.use('/cart', cartV1)

app.get('/', (request, response) => {
  response.send('Hello World!')
})

// Keep at end to handle errors and 404s
app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('server started on port: ', PORT)
})
