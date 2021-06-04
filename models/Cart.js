const mongoose = require('mongoose')

const { Schema } = mongoose

const cartSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
