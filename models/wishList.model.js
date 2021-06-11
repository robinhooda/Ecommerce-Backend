const mongoose = require('mongoose')

const { Schema } = mongoose

const wishListSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const WishList = mongoose.model('WishList', wishListSchema)
module.exports = WishList
