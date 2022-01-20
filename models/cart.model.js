const mongoose = require('mongoose')

const { Schema } = mongoose

const cartSchema = new Schema(
  {
    _id: {
      type: String,
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
          required: 'Please enter quantity to the cartItem',
        },
      },
    ],
  },

  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
