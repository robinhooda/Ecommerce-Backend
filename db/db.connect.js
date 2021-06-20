const mongoose = require('mongoose')

//connection to DB

const initializeDB = () =>
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('Connected to DB!'))
    .catch((error) => console.log('mongoose connection failed!', error))

module.exports = { initializeDB }
